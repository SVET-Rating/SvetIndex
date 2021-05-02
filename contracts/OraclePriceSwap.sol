pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iExperts.sol";
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


    function addPrice   (address _addrToken, uint _price ) external override onlyExpert {
  // no functionality, just for compability

    }

    
    function setOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }


    function getLenPrice (address _addrToken) external override view  returns (uint) { //onlyExchange
        // no functionality, just for compability

        return 0;
    }
    
    function getLastPrice (address _addrToken) external override view  returns (uint) { //onlyExchange
        require(prices[_addrToken].length > 0, "No price for this token");
        return prices[_addrToken][prices[_addrToken].length-1].price;
    }


    function getallTokens () external override view  returns (address[] memory ) {  //onlyExpert
            // no functionality, just for compability

        address[] memory tokens;
        
        return tokens;
    }

    function delToken   (address _addrToken) onlyOwner external override {
        // no functionality, just for compability

    }
 



}
