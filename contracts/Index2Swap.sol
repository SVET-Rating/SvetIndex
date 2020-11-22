pragma solidity ^0.6.1;
//import "./interfaces/iIndex2Swap.sol";
import "./interfaces/iIndextoken.sol";
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iLstorage.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";


contract Index2Swap  {
    using SafeMath  for uint;

    /**
    *     SvetSwap
    * 1. Client wants to buy an index. 
    * 2. He pays Svets for us.
    * 3. He configure index (or choose preconfs) and it's smart 
    * contract deploys as ERC20 token (and client can trade this)
    * 4. We send DAI to Uniswap markets for choosed pairs,  
    * proportionaly . And get reward as liquidity providers. And 
    * don't response for this funds.
    * 5. If client wants to return investments, he can choose 
    * delivery or settlement. 
    * 5.1 if he choose settlement, we return to him DAI at current 
    * price from Uniswap
    * 5.2 if choosed delivery, we returns dai , exchange to tokens 
    * and send to him tokens.
    * 6. Next stage,  after we get enough liquidity, we'll start 
    * fork of Uniswap.
     */

    address owner;
    iOraclePrice oraclePrice;
    iLstorage lstorage;
    IERC20 svetT;

    IUniswapV2Router02 uniswapV2Router02;
    
    uint16 miningDelay = 600; //secs
    uint8 discount = 99; //% 
    


    constructor () public  {
        owner = msg.sender;
    }

    modifier onlyOwner () {
      require(msg.sender == owner, "Only owner can do this");
      _;
    }

    function setNewOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setSwap (address _addrRout, uint8 _discount, uint16 _miningDelay) public onlyOwner {

        require(_discount  > 0 && _addrRout != address (0x0), "in setIUniswapV2 all must !=0");
//       
        uniswapV2Router02 = IUniswapV2Router02 (_addrRout);
        miningDelay = _miningDelay;
        discount = _discount;

    }

    function set ( address _svetT, address _oraclePrice, address _lstor) public onlyOwner {

            svetT = IERC20(_svetT);
            oraclePrice = iOraclePrice (_oraclePrice);
            lstorage = iLstorage(_lstor);
        }

/*
    function fill (address _addrIndex, 
                        address _addrActive1, //DAI
                        address _addrActive2,  // token
                        uint256 _amount1, 
                        uint256 _amount2) in1 override returns (uint256 amountRes1, uint256 amountRes2) { 

        // here wee need connection to Uniswap

        
        IERC20 a1 = IERC20 (_addrActive1);
        require(a1.transferFrom(msg.sender, address(this), _amount1), 'transferFrom failed.');

        
        require(a1.approve(address(uniswapV2Router02), _amount1), 'approve Active1 failed.');

        // amountOutMin must be retrieved from an oracle of some kind
        address[] memory path = new address[](2);
        path[0] = _addrActive1;
        path[1] = _addrActive2;
        uniswapV2Router02.swapTokensForExactTokens(_amount1,_amount2 * uint256(discount) /100, path, msg.sender, block.timestamp);
        
        //send liquidity  
        uint liqCurr;
        ( amountRes1, amountRes2, liqCurr) = uniswapV2Router02.addLiquidity(
                     _addrActive1,
                     _addrActive2,
                    0,// _amount1, //uint amountADesired,
                     _amount2, //uint amountBDesired,
                    0,// _amount1 * uint256(discount) /100,
                     _amount2.mul(uint(discount)).div(uint(100)),
                     address (this),
                     block.timestamp + miningDelay
                    ) ;
        liquidity [_addrIndex][_addrActive2] += liqCurr;

    }
*/
    function fillETH (address _addrIndex,                        
                        address _addrActive2,  // token
                        uint256 _amount1, 
                        uint256 _amount2) internal   returns (uint256 amountRes1, uint256 amountRes2) { 

        // here wee need connection to Uniswap

        
        // amountOutMin must be retrieved from an oracle of some kind
        address[] memory path = new address[](2);
        path[0] = uniswapV2Router02.WETH();
        path[1] = _addrActive2;
        uniswapV2Router02.swapETHForExactTokens{ value: _amount1 }( _amount2, path, address (this), block.timestamp + miningDelay);
        
        //send liquidity  
        uint liqCurr;
        ( amountRes1, amountRes2, liqCurr) = uniswapV2Router02.addLiquidity(
                     path[0],
                     _addrActive2,
                    0,// _amount1, //uint amountADesired,
                     _amount2, //uint amountBDesired,
                    0,// _amount1 * uint256(discount) /100,
                    _amount2.mul(uint(discount)).div(uint(100)),
                    address (this),
                     block.timestamp + miningDelay
                    ) ;
        lstorage.add (_addrIndex, _addrActive2,liqCurr);

    }

    function withdraw (address _addrIndex,
                        address _addrActive1, //dai, weth
                        address _addrActive2,  //token
                        uint256 _amount1 ,
                        address _whom                        
                        ) internal returns (uint256 amountRes1, uint256 amountRes2) { 

        // here wee need connection to Uniswap        
        //return liquidity  
    
        IUniswapV2Factory uniswapV2Factory = IUniswapV2Factory (uniswapV2Router02.factory());
        address curPairAddr = uniswapV2Factory.getPair(_addrActive1, _addrActive2);
        require(curPairAddr != address(0), "No pair");        
        IUniswapV2Pair curPair = IUniswapV2Pair (curPairAddr);
        (uint112 reserve1,,) = curPair.getReserves();

        uint needLiq = _amount1.mul(curPair.totalSupply()).div(reserve1);
        
        lstorage.sub (_addrIndex, _addrActive2,needLiq);
        ( amountRes1, amountRes2) = uniswapV2Router02.removeLiquidity(
                     _addrActive1,
                     _addrActive2,
                     needLiq,
                     _amount1, //gets DAI directly
                      0, 
                     _whom,
                     block.timestamp + miningDelay
                    );
    }


    function buySvet4Eth () public payable {
        uint priceEth =  oraclePrice.getLastPrice(uniswapV2Router02.WETH());
        require(priceEth > 0, "No price Eth");
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        require(priceSvet > 0, "No price Svet");
        svetT.transfer(msg.sender,msg.value.div(priceEth).div(priceSvet)); //prices in ether

    }

    function withdrEth4Svet (uint _amount) public {
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        address wETH = uniswapV2Router02.WETH();
        uint priceEth =  oraclePrice.getLastPrice(wETH);
        require(priceSvet > 0, "No price Svet");
        require(priceEth > 0, "No price Eth");
        svetT.transferFrom(msg.sender, address(this), _amount); //prices in ether
        uint amount = _amount.mul(priceSvet).div(priceEth);
        address[] memory path = new address[](2);
        path[0] = wETH;
        path[1] = wETH;
        uniswapV2Router02.swapTokensForExactETH(
             _amount, 
             amount.mul(discount), 
             path, 
             address (this), 
             block.timestamp + miningDelay);
        payable(msg.sender).transfer(amount);

    }

    function buyIndexforSvetEth (uint _amount, address _indexT) public returns (uint256 amountRes1, uint256 amountRes2){
        
        // _amount - amount of index to buy
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        uint priceEth =  oraclePrice.getLastPrice(uniswapV2Router02.WETH());
        iIndexToken index = iIndexToken(_indexT);
        
        uint actLen = index.getActivesLen();
        uint  totPriceActSv;
        for (uint8 i = 0; i<actLen; i++) {
            (address addrActive, uint256 amount) = index.getActivesItem(i);
            uint priceAct = oraclePrice.getLastPrice(addrActive).div(priceEth); //if prices in USD
            amount = amount.mul(_amount);
             totPriceActSv += amount.mul( priceAct.div(priceSvet)); //
            // need ti be approved first for all sum! 
            (uint256 amountRet1, uint256 amountRet2) = fillETH (
             _indexT, 
            addrActive,  //
            amount.div(priceAct), // ethers to put
            amount //tokens to get 
            ) ;
            amountRes1 += amountRet1;
            amountRes2 += amountRet2;
        }
        svetT.transferFrom(msg.sender, address(this),totPriceActSv);
        index.mint(msg.sender, _amount);

    }

    function sellIndexforSvet (uint _amount, address _indexT) public returns (uint256 amountRes1, uint256 amountRes2){
        address wETH = uniswapV2Router02.WETH();
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        uint priceEth =  oraclePrice.getLastPrice(wETH);
        iIndexToken index = iIndexToken(_indexT);
        
        uint  totPriceActSv;
        uint actLen = index. getActivesLen();
        for (uint8 i = 0; i<actLen; i++) {
            (address addrActive, uint256 amount) = index.getActivesItem(i);
            uint priceAct = oraclePrice.getLastPrice(addrActive).div(priceEth); //if prices in USD
            amount = amount.mul(_amount);
            totPriceActSv += amount.mul( priceAct.div(priceSvet)); //
            (uint256 amountRet1, uint256 amountRet2) = withdraw (
            _indexT, 
            wETH, 
            addrActive,  //
            amount, //tokens to get 
            address (this)) ;
            amountRes1 -= amountRet1;
            amountRes2 -= amountRet2;
        }
        index.burnFrom(msg.sender, _amount);
        svetT.transfer(msg.sender, totPriceActSv);
        
    }
}