pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iExperts.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Pair.sol";
//import "./libraries/UniswapV2OracleLibrary.sol";
import './libraries/FixedPoint.sol';

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/iIndextoken.sol";


contract OraclePrice is iOraclePrice {

    iExperts experts;
    IUniswapV2Router02 uniswapV2Router02;

    struct PriceItem {
        uint price;
        uint time;
    }

    mapping (address => PriceItem[])  prices;
    address[] tokens;

    address owner;
    address exchange;

    constructor () public  {
        owner =  msg.sender;
    }

    modifier onlyOwner () {
        require (msg.sender == owner,"Only owner");
        _;
    }

    modifier onlyExpert () {
        require (experts.isExpert(msg.sender), "Only expert can do this");
        _;
    }

    function setExpertsContr (address _addrExp) public onlyOwner {
        experts = iExperts(_addrExp);
    }

    function setNewOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setRouter ( address _addrRout) public onlyOwner {
        uniswapV2Router02 = IUniswapV2Router02 (_addrRout);
    }


    function addPrice   (address _addrToken, uint _price ) external override onlyExpert {
        if (prices[_addrToken].length == 0) {
            tokens.push(_addrToken);
        }
        prices[_addrToken].push(PriceItem(_price, now));

    }

    
    function setOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }


    function getLenPrice (address _addrToken) external override view  returns (uint) { //onlyExchange
        return prices[_addrToken].length;
    }
    
    function getLastPrice (address _addrToken) public override view  returns (uint256 lastPrice) { //onlyExchange
        if ( prices[_addrToken][prices[_addrToken].length-1].price > 0) {
            lastPrice = prices[_addrToken][prices[_addrToken].length-1].price;
        }
        else  {

           IUniswapV2Pair pair = IUniswapV2Pair(IUniswapV2Factory (uniswapV2Router02.factory()).getPair(uniswapV2Router02.WETH(), _addrToken));
            (uint112 reserve0, uint112 reserve1,) = pair.getReserves(); 

            if (pair.token0() == _addrToken && reserve1 > 0 ) {
                lastPrice = reserve0 *10**18/ reserve1; //uint(FixedPoint.fraction(reserve0, reserve1)._x) ; 
            } else   if (pair.token1() == _addrToken && reserve0 > 0) {
                lastPrice = reserve1 *10**18 / reserve0; // uint(FixedPoint.fraction(reserve1, reserve0)._x);
            } else {
                revert ("No price found on swap");
            }
 
        }
        
    }

    function getIndexPrice (address _indexT) public returns (uint priceIndexTot, uint [] memory allPrices) {
        iIndexToken index = iIndexToken(_indexT);

        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
            allPrices[i] = getLastPrice(addrActive);
            priceIndexTot += share *  allPrices[i] /10**18  ;

        }
    }

    function getPriceEthforAmount (address _addrToken,  uint256 _amount ) public returns (uint price) {
        address [] memory path; 
        path[0] = uniswapV2Router02.WETH();
        path[1] = _addrToken;
        uint[] memory amounts = uniswapV2Router02.getAmountsIn(_amount, path);
        price = amounts[0]*10**18/amounts[1];
    }

    function getIndexPriceforAmount (address _indexT, uint256 _amount) public returns (uint priceIndexTot, uint [] memory allPrices) {
        iIndexToken index = iIndexToken(_indexT);

        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
            allPrices[i] = getPriceEthforAmount(addrActive, _amount*share / 10**18);
            priceIndexTot += share *  allPrices[i] /10**18  ;

        }
    }

    function getallTokens () external override view  returns (address[] memory ) {  //onlyExpert
        return tokens;
    }

    function delToken   (address _addrToken) onlyOwner external override {
        delete prices[_addrToken];
    }
 



}
