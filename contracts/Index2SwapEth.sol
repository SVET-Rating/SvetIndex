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


contract Index2SwapEth  {
  //  using SafeMathUniswap for uint;

    /**
    Index2SwapEth
    1. Client wants to buy an index. 
    2. He choose preconfigured index 
    3. He pays Ethers to us +  buying fee in SVETs to Index2SwapEth
    4. We send Ethers to Uniswap AMM for choosed pairs,  
      proportionally shares in index
    5. We sends index portfolio tokens to client
    6. If client wants to sell index, he sends index tokens to smart contract Index2SwapEth
    7. smart contract sends tokens to uniswap and gets Ethers
    8.  we return to him Eth at current  price from Uniswap minus selling  fee in SVET
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
                        uint256 _amount0,
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
            
        amountRet = uniswapV2Router02.getAmountsOut(_amount0, path);
      //  require (reserve1 >= amountRet[1], "No enought tokenTo in pair");

        amountRet = uniswapV2Router02.swapExactETHForTokens{ value: _amount0 }( amountRet[1] * _discount/100, path, address (this), block.timestamp + _miningDelay);
        // todo: to realize disco


    }

       function buyIndexforSvetEth (uint _amount,  //in ether 
                                address _indexT,                     
                                uint256 _miningDelay,
                                uint256 _discount) payable public{// _amount - amount of index to buy  returns (uint  amountRes0, uint amountRes1)
        uint256 priceIndexTot;

        iIndexToken index = iIndexToken(_indexT);
        uint svetPrice = oraclePrice.getLastPrice(address(svetT));

        if (buyFee > 0)  {   
            uint fee = _amount * uint(buyFee) / svetPrice /10000;
       //     (bool success, bytes memory result) = address(svetT).delegatecall(abi.encodeWithSignature("transfer(address,uint)",  address(this), fee));
       //     require(success, string (result));
            svetT.transferFrom(msg.sender, address(this), fee );
        }
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);

            uint256  sumEth4Act = share * _amount /10000 ;   // oracle in ether
            priceIndexTot += share * oraclePrice.getLastPrice(addrActive) ; // price of bougth index in ethers
            uint[] memory amountRet = fillETH (
            //    _indexT,                 
                addrActive,
                 sumEth4Act,  // 10**22,  //
                _miningDelay,
                _discount
            );


            lstorage.add (msg.sender, _indexT, addrActive, amountRet[1]);

        }
        uint sumInd =  _amount * priceIndexTot /10000 ; //ether->svet
        //accept ethers 
      //  (bool successE, bytes memory returnData) = address(msg.sender).delegatecall{value: msg.value}(abi.encodeWithSignature(signatureString, arg);("transfer()"))));
        //transfer()
    //    require(successE, string(returnData));

        index.mint(msg.sender, sumInd  );

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
     
        (uint reserve0, uint reserve1,) = IUniswapV2Pair (
                    IUniswapV2Factory (uniswapV2Router02.factory()
                ).getPair(uniswapV2Router02.WETH(), addrActive)
            ).getReserves();
            
        address[] memory path = new address[](2);
        path[0] = addrActive; //active
        path[1] = uniswapV2Router02.WETH(); //eth

        amountRet = uniswapV2Router02.getAmountsOut(_amount, path);
      //  require (reserve1 >= amountRet[1], "No enought tokenTo in pair");
        IERC20(addrActive).approve(address(uniswapV2Router02), amountRet[0]);
        amountRet = uniswapV2Router02.swapExactTokensForETH(  amountRet[0] , amountRet[1]* _discount / 100, path, address (this), block.timestamp + _miningDelay);


    }

    function sellIndexforEth (uint _amount, // in index
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

            lstorage.sub (msg.sender, _indexT, addrActive, amountRet[0]);
            amountEth +=amountRet[1];
            }
        index.burnFrom(msg.sender, _amount);
        if (sellFee > 0)  {   
            uint fee = totPriceActSv * uint(sellFee) /10000;
       //     (bool success, bytes memory result) = address(svetT).delegatecall(abi.encodeWithSignature("transfer(address,uint)",  address(this), fee));
    //        require(success, string (result));
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
