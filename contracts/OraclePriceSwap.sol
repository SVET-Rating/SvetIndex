pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iExperts.sol";
import "./interfaces/IUniswapV2Factory.sol"
import "./libraries/UniswapV2OracleLibrary.sol";

contract OraclePrice is iOraclePrice {

    iExperts experts;

    struct PriceItem {
        uint price;
        uint time;
    }

    mapping (address => PriceItem[])  prices;
    address[] tokens;

    address owner;
    address exchange;
    address factory; 

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

    function setFactory (address _addr) public onlyOwner
        {
        factory = _addr;
        }


    function addPrice   (address _addrToken, uint _price ) external override onlyExpert {
  // no functionality, just for compability

    }

    
    function setOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }

    function getPairPrice (address active1, address active2) returns(uint price12Cumulative, uint price21Cumulative, uint32 blockTimestamp) {
        address pair =  IUniswapV2Factory (factory).pairFor (active1, active2);

       (price12Cumulative,price21Cumulative, blockTimestamp)  = UniswapV2OracleLibrary.currentCumulativePrices(pair).
    }



}
