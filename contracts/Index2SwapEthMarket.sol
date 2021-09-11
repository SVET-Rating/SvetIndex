pragma solidity >= 0.6.12;
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


contract Index2SwapEthMarket  {
  //  using SafeMathUniswap for uint;

    /**

    Index2SwapEthMarket (market order), minting indexes, index tokens CAN BE  transferable
    1. Client wants to buy an index portfolio token with exact amount of actives
    2. He choose preconfigured index 
    3. He order amount of index portfolo and pays Ethers+slippage  to us and buying fee in SVETs (if fee>0) to Index2SwapEthMarket
    4. We caclulating needed amount of  Ethers and sending  to Uniswap AMM for choosed pairs,  
      4.1 proportionally shares (in tokens) in index, ordered to buy concrete amounts of actiives.
      4.2 if fact spent ether little then sent by client, difference returned to client
    5. We minting index portfolio tokens and sending to client
    6. If client wants to sell index, he sends index tokens to smart contract Index2SwapEthMarket
    7. smart contract sends tokens to uniswap and gets Ethers proportionally bought activites with current price
    8.  we return to him  Eth proceeds from sale at current  price from Uniswap minus selling  fee in SVET (if fee>0) , 
    9. index token burns
     */

    address owner;
    iOraclePrice oraclePrice;
    iLstorage lstorage;
    IERC20 svetT;

    IUniswapV2Router02 uniswapV2Router02;
    
   // uint16 miningDelay = 600; //secs
   // uint8 discount = 99; //% 
    uint16 public buyFee; // in tens promille (needs to div by 10000)
    uint16 public sellFee; // in tens promille (needs to div by 10000)

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


    function set ( address _svetT, address _oraclePrice, address _lstor, address _addrRout) public onlyOwner {

            svetT = IERC20(_svetT);
            oraclePrice = iOraclePrice (_oraclePrice);
            lstorage = iLstorage(_lstor);
            uniswapV2Router02 = IUniswapV2Router02 (_addrRout);

        }

    function setFees (uint16 _buyFee,
        uint16 _sellFee) public onlyOwner { 
        buyFee = _buyFee;
        sellFee = _sellFee;
                        }

    function fillETH (//address _addrIndex,                        
                        address _addrActive1,  // token
                        uint256 _amount1,
                        uint256 _miningDelay,
                        uint256 _discount
                        ) internal   returns (uint[] memory amountRet) { 

        // here wee need connection to Uniswap
        address[] memory path = new address[](2);
        path[0] = uniswapV2Router02.WETH();
        path[1] = _addrActive1;
        (uint reserve0,uint reserve1,) = IUniswapV2Pair (
                    IUniswapV2Factory (uniswapV2Router02.factory()
                ).getPair(uniswapV2Router02.WETH(), _addrActive1)
            ).getReserves(); 
            
        amountRet = uniswapV2Router02.getAmountsIn(_amount1, path);
      //  require (reserve1 >= amountRet[1], "No enought tokenTo in pair");

        amountRet = uniswapV2Router02.swapETHForExactTokens{ value: amountRet[0] }( amountRet[1], path, address (this), block.timestamp + _miningDelay);
        


    }

       function buyIndexforSvetEth (uint _amount,  //_amount in INdex - market order scenario
                                address _indexT,                     
                                uint256 _miningDelay,
                                uint256 _discount) payable public{
        uint256 priceIndexTot;
        uint256 spendedEth;
        iIndexToken index = iIndexToken(_indexT);
        uint svetPrice = oraclePrice.getLastPrice(address(svetT));

        if (buyFee > 0)  {   
            uint fee = _amount * uint(buyFee) / svetPrice /10000; //buyFee in %%  * 100

            svetT.transferFrom(msg.sender, address(this), fee );
        }
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
        {            
            (address addrActive, uint256 share) = index.getActivesItem(i);

             // oracle in ether
            priceIndexTot += share * oraclePrice.getLastPrice(addrActive)/10**18  ;

            uint[] memory amountRet = fillETH (
            //    _indexT,                 
                addrActive,
                share * _amount /10**18,  // 10**22,  //
                _miningDelay,
                _discount
            );
            spendedEth += amountRet[0];

            lstorage.add (msg.sender, _indexT, addrActive, amountRet[1]);
            }

        }
        //returning odds
        if (msg.value > spendedEth ) {
            payable(msg.sender).transfer(msg.value - spendedEth);
        }
        
        //accept ethers 
         index.mint(msg.sender, _amount ); //index

    }


    function swapInd4Eth (//address _addrIndex,
                        address addrActive,  //token
                        uint256 _amount,
                        uint256 _miningDelay,
                        uint256 _discount 
                        //address _whom                        
                        ) public payable returns (uint[] memory amountRet) { 

        // here wee need connection to Uniswap        
        //return reserves (using  for debugging only, can be deleted in production)  

        (uint reserve0, uint reserve1,) = IUniswapV2Pair (
                    IUniswapV2Factory (uniswapV2Router02.factory()
                ).getPair(uniswapV2Router02.WETH(), addrActive)
            ).getReserves();
            
        address[] memory path = new address[](2);
        path[0] = addrActive; //active
        path[1] = uniswapV2Router02.WETH(); //eth

        amountRet = uniswapV2Router02.getAmountsOut(_amount, path);
        IERC20(addrActive).approve(address(uniswapV2Router02), _amount);
        amountRet = uniswapV2Router02.swapExactTokensForETH(  _amount , amountRet[1]* _discount / 100, path, address (this), block.timestamp + _miningDelay);


    }

    function sellIndexforEth (uint _amount, //_amount  in index tokesn
                             address _indexT,
                             uint256 _miningDelay,
                             uint256 _discount) public returns (uint[] memory amountRet){
        iIndexToken index = iIndexToken(_indexT);
        uint256  totPriceActSv;
        uint256 amountEth;
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint share) = index.getActivesItem(i);
            uint amount = _amount * lstorage.getBalance (msg.sender, _indexT, addrActive) /  index.balanceOf(msg.sender);

            // *_amount  /10000;
            totPriceActSv += amount * 
                        oraclePrice.getLastPrice(addrActive) /
                        oraclePrice.getLastPrice(address(svetT)); //
            amountRet = swapInd4Eth (
                //_indexT, 
                addrActive,  //
                amount, //tokens to get 
                //address (this)
                _miningDelay,
                _discount
                ) ;

            lstorage.sub (msg.sender, _indexT, addrActive, amount);
            amountEth +=amountRet[1];
            }
        index.burnFrom(msg.sender, _amount);
        if (sellFee > 0)  {   
            uint fee = totPriceActSv * uint(sellFee) /10000;
  
           svetT.transferFrom(msg.sender, address(this), fee);

            }
        payable(msg.sender).transfer(amountEth);

    }

    function withdrawSvet (uint _amount) public onlyOwner { //TODO in distributed custody version needs to change to onlyFactory 

        svetT.transfer(msg.sender, _amount); 
    

    }


    function upgrade (address payable _newContract ) public onlyOwner {
        require(_newContract != msg.sender);
        address[] memory tokens  = oraclePrice.getallTokens();
        for (uint256 t=0; t<tokens.length; t++){
            IERC20 tok = IERC20(tokens[t]);
            if (tok.balanceOf(address(this)) > 0) {
                tok.transfer(_newContract, tok.balanceOf(address(this)));
            }
        }
          (_newContract).transfer(address(this).balance);
    }    


}
