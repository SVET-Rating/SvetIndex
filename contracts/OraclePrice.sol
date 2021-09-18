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
    uint testprice;
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

    function getDecimals(address _tok) internal view returns (uint256) {
        try IERC20Uniswap(_tok).decimals() returns (uint8 dec) {
            return uint256(dec);
        } catch {
            return 18;
        }
    
    }

    function getLastPrice (address _addrToken) public override view  returns (uint256 lastPrice) { //onlyExchange
        PriceItem[] memory priceArr = prices[_addrToken];
        if ( priceArr.length > 0) {
            lastPrice = priceArr[priceArr.length-1].price;
        }
        else  {

           IUniswapV2Pair pair = IUniswapV2Pair(IUniswapV2Factory (uniswapV2Router02.factory()).getPair(uniswapV2Router02.WETH(), _addrToken));
            (uint112 reserve0, uint112 reserve1,) = pair.getReserves();
            require (reserve0 > 0, "reserve0 = 0");
            require (reserve1 > 0, "reserve1 = 0");

            if (pair.token0() == _addrToken  ) {
                lastPrice = reserve1 *( 1 ether)/ reserve0; //uint(FixedPoint.fraction(reserve0, reserve1)._x) ;
            } else   if (pair.token1() == _addrToken ) {
                lastPrice = reserve0 *( 1 ether) / reserve1; // uint(FixedPoint.fraction(reserve1, reserve0)._x);
            } else {
                lastPrice = 0; //no price;
            }

        }

    }

    function getIndexPrice (address _indexT) public view override returns (uint256 priceIndexTot)
    {
        iIndexToken index = iIndexToken(_indexT);
        //uint256[] memory allPrices;

        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
         //   allPrices[i] = getLastPrice(addrActive);
            priceIndexTot = priceIndexTot + share *  getLastPrice(addrActive) /( 1 ether)  ;

        }
    }

    function getAllActsIndPrices (address _indexT) public view override returns (uint256[] memory )
    {
        iIndexToken index = iIndexToken(_indexT);
        uint len = index.getActivesLen();
        uint256[] memory allPrices = new uint256[](len);

        for (uint256 i = 0; i<len; i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
            allPrices[i] =   getLastPrice(addrActive) * share/( 1 ether);

        }
       return allPrices;
    }

    function getPriceEthforAmount (address _addrToken,  uint256 _amount, bool _buy ) public view override returns (uint ) {
        address [] memory path = new address[](2);
        IUniswapV2Pair pair = IUniswapV2Pair(IUniswapV2Factory (uniswapV2Router02.factory()).getPair(uniswapV2Router02.WETH(), _addrToken));  //todo for debugging, remove on release
        if (_buy) {
            path[0] = uniswapV2Router02.WETH();
            path[1] = _addrToken;
            (uint112 reserve0, uint112 reserve1,) = pair.getReserves(); //todo for debugging, remove on release

            uint[] memory amounts = uniswapV2Router02.getAmountsIn(_amount, path);
            if (amounts[1] == 0) return 0; //no amounts for token
            return  amounts[0]*( 1 ether)/amounts[1];
        } else {
            path[0] = _addrToken;
            path[1] = uniswapV2Router02.WETH();
            (uint112 reserve0, uint112 reserve1,) = pair.getReserves(); //todo for debugging, remove on release
            uint[] memory amounts = uniswapV2Router02.getAmountsOut(_amount, path);
            if (amounts[0] == 0) return 0; //no amounts for token
            return  amounts[1]*( 1 ether)/_amount; // price in eth/token
        }
    }

    function getIndexPriceforAmount (address _indexT, uint256 _amount, bool _buy) public view override returns (uint256 priceIndexTot) {
        iIndexToken index = iIndexToken(_indexT);
        for (uint8 i = 0; i<index.getActivesLen(); i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
            uint priceA = getPriceEthforAmount(addrActive, _amount*share / ( 1 ether), _buy);
            priceIndexTot = priceIndexTot + share * priceA  /( 1 ether)  ;

        }
    }

    function getAllActsIndPricesAmount (address _indexT, uint256 _amount, bool _buy) public view override returns (uint256[] memory )
    {
        iIndexToken index = iIndexToken(_indexT);
        uint len = index.getActivesLen();
        uint256[] memory allPrices = new uint256[](len);

        for (uint256 i = 0; i<len; i++) {
            (address addrActive, uint256 share) = index.getActivesItem(i);
            allPrices[i] =   getPriceEthforAmount(addrActive, _amount*share / ( 1 ether), _buy) * share/( 1 ether);

        }
       return allPrices;
    }

    function getallTokens () external override view  returns (address[] memory ) {  //onlyExpert
        return tokens;
    }

    function delToken   (address _addrToken) onlyOwner external override {
        delete prices[_addrToken];
    }


    function test (address _indexT, uint _amount, bool _buy) public onlyOwner {
        uint256[] memory pricesss = getAllActsIndPrices(_indexT);

        testprice = getIndexPriceforAmount(_indexT, _amount, _buy);
    }

}
