pragma solidity =0.6.12;
import "./interfaces/iIndex2Swap.sol";
import "./interfaces/iIndextoken.sol";
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iLstorage.sol";

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Router02.sol";

//import "@openzeppelin/contracts/math/SafeMath.sol";
//import "./libraries/SafeMath.sol";
//import "./libraries/UniswapV2Library.sol";
//import "./libraries/UniswapV2OracleLibrary.sol";


contract Index2Swap is iIndex2Swap {
  //  using SafeMathUniswap for uint;

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
    
   // uint16 miningDelay = 600; //secs
   // uint8 discount = 99; //% 
    


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
    
    receive() external payable {
    }

    function setSwap (address _addrRout) public onlyOwner {

        require( _addrRout != address (0x0), "in setIUniswapV2 all must !=0");
      
        uniswapV2Router02 = IUniswapV2Router02 (_addrRout);


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
    function fillETH (//address _addrIndex,                        
                        address _addrActive2,  // token
                        uint256 _amount1,
                        uint256 _miningDelay,
                        uint256 _discount
                        ) internal   returns (uint[] memory amountRet) { 

        // here wee need connection to Uniswap
        address[] memory path = new address[](2);
        path[0] = uniswapV2Router02.WETH();
        path[1] = _addrActive2;
   /*     (,uint reserve1,) = IUniswapV2Pair (
                    IUniswapV2Factory (uniswapV2Router02.factory()
                ).getPair(uniswapV2Router02.WETH(), _addrActive2)
            ).getReserves(); */
        amountRet = uniswapV2Router02.getAmountsOut(_amount1, path);
    //    require (reserve1 >= amountRet[1], "No enought tokenTo in pair");

        amountRet = uniswapV2Router02.swapExactETHForTokens{ value: _amount1 }( amountRet[1] * _discount/100, path, address (this), block.timestamp + _miningDelay);
        // todo: to realize disco
        //send liquidity  
 /*       uint liqCurr;
        ( amountRes1, amountRes2, liqCurr) = uniswapV2Router02.addLiquidity(
                     path[0],
                     _addrActive2,
                    0,// _amount1, //uint amountADesired,
                     amountRet[1], //uint amountBDesired,
                    0,// _amount1 * uint256(discount) /100,
                    amountRet[1]*discount/100,
                    address (this),
                     block.timestamp + miningDelay
                    ) ;
                    */

    }

    function swapInd4Eth (//address _addrIndex,
                        address addrActive,  //token
                        uint256 _amount,
                        uint256 _miningDelay,
                        uint256 _discount 
                        //address _whom                        
                        ) public payable returns (uint[] memory amountRet) { 

        // here wee need connection to Uniswap        
        //return liquidity  
     /*
        (,uint reserve1,) = IUniswapV2Pair (
                    IUniswapV2Factory (uniswapV2Router02.factory()
                ).getPair(uniswapV2Router02.WETH(), addrActive)
            ).getReserves();
            */
        address[] memory path = new address[](2);
        path[0] = addrActive; //active
        path[1] = uniswapV2Router02.WETH(); //eth

        amountRet = uniswapV2Router02.getAmountsOut(_amount, path);
      //  require (reserve1 >= amountRet[1], "No enought tokenTo in pair");
        IERC20(addrActive).approve(address(uniswapV2Router02), amountRet[0]);
        amountRet = uniswapV2Router02.swapExactTokensForETH(  amountRet[0] , amountRet[1]* _discount / 100, path, address (this), block.timestamp + _miningDelay);


/*
        uint needLiq = _amount1.mul(curPair.totalSupply()).div(reserve1);
        
        
        ( amountRes1, amountRes2) = uniswapV2Router02.removeLiquidity(
                     _addrActive1,
                     _addrActive2,
                     needLiq,
                     _amount1, //gets DAI directly
                      0, 
                     _whom,
                     block.timestamp + miningDelay
                    );
                    */
    }


    function buySvet4Eth () public payable override {
        uint priceEth =  oraclePrice.getLastPrice(uniswapV2Router02.WETH());
        require(priceEth > 0, "No price Eth");
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        require(priceSvet > 0, "No price Svet");
        uint amount = msg.value *  priceEth / priceSvet;
        svetT.transfer(msg.sender, amount);  //prices in ether

    }

    function withdrEth4Svet (uint _amount) public {
        uint priceSvet =  oraclePrice.getLastPrice(address(svetT));
        address wETH = uniswapV2Router02.WETH();
        uint priceEth =  oraclePrice.getLastPrice(wETH);
        require(priceSvet > 0, "No price Svet");
        require(priceEth > 0, "No price Eth");
        svetT.transferFrom(msg.sender, address(this), _amount); //prices in ether
        uint amount = _amount * priceSvet / priceEth;

        payable(msg.sender).transfer(amount);

    }

    function buyIndexforSvetEth (uint _amount, 
                                address _indexT,
                                uint256 _miningDelay,
                                uint256 _discount) public{// _amount - amount of index to buy  returns (uint  amountRes0, uint amountRes1)
        uint priceIndex;
        iIndexToken index = iIndexToken(_indexT);
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
                        
            uint[] memory amountRet = fillETH (
            //    _indexT, 
                addrActive,  //
                share * _amount * oraclePrice.getLastPrice(address(svetT)) / //usd
                 oraclePrice.getLastPrice(uniswapV2Router02.WETH()) / 10000,
                _miningDelay,
                _discount
            );
            priceIndex += share * oraclePrice.getLastPrice(addrActive);
            lstorage.add (msg.sender, _indexT, addrActive, amountRet[1]);
        }
        svetT.transferFrom(msg.sender, address(this),_amount);
        index.mint(msg.sender, _amount * priceIndex / oraclePrice.getLastPrice(address(svetT)) / 10000);

    }

    function sellIndexforSvet (uint _amount,
                             address _indexT,
                             uint256 _miningDelay,
                             uint256 _discount) public returns (uint[] memory amountRet){
        uint priceIndex;
        iIndexToken index = iIndexToken(_indexT);
        uint  totPriceActSv;
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint share) = index.getActivesItem(i);
            uint amount = _amount * lstorage.getBalance (msg.sender, _indexT, addrActive) /  index.balanceOf(msg.sender);

            // *_amount  /10000;
            totPriceActSv += amount * 
                        oraclePrice.getLastPrice(addrActive) /
                        oraclePrice.getLastPrice(address(svetT)); //
             priceIndex += share * oraclePrice.getLastPrice(addrActive);
            amountRet = swapInd4Eth (
                //_indexT, 
                addrActive,  //
                amount, //tokens to get 
                //address (this)
                _miningDelay,
                _discount
                ) ;

            lstorage.sub (msg.sender, _indexT, addrActive, amountRet[0]);

            }
        index.burnFrom(msg.sender, _amount * priceIndex / oraclePrice.getLastPrice(address(svetT)) / 10000);
        svetT.transfer(msg.sender, totPriceActSv);

    }

    function upgrade (address _token, address _newContract, uint _amount ) public onlyOwner {
        require(_newContract != msg.sender);
        IERC20 tok = IERC20(_token);
        tok.transfer(_newContract, _amount);
    }
}
