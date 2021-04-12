pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iOracleTotSupply.sol";
import "./interfaces/iExperts.sol";


contract OracleTotSupply is iOracleTotSupply {

    iExperts experts;

    struct amountItem { //circulation amounts
        uint amount;
        uint time;
    }

    mapping (address => amountItem[])  amounts;
    address[] tokens;

    address owner;
    address exchange;

    constructor ()  public {
        owner =  msg.sender;
    }

    modifier onlyOwner () {
        require (msg.sender == owner,"Only owner");
        _;
    }

    modifier onlyExpert () { // todo !!! not msg.sender!
        require (experts.isExpert(msg.sender), "Only expert can do this");
        _;
    }
  /*  
    modifier onlyExchange () {
        require (msg.sender == exchange, "Only exchange");
        _;
    }
*/
    function setExpertsContr (address _addrExp) public onlyOwner {
        experts = iExperts(_addrExp);
    }
  /*  
    function setExchange (address _addrExchange) public onlyOwner {
        exchange = _addrExchange;
    }
*/
    function setNewOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }


    function addamount   (address _addrToken, uint _amount ) external override onlyExpert {
        if (amounts[_addrToken].length == 0) {
            tokens.push(_addrToken);
        }
        amounts[_addrToken].push(amountItem(_amount, now));

    }

    
    function setOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }


    function getLenamount (address _addrToken) external override view  returns (uint) { //onlyExchange
        return amounts[_addrToken].length;
    }
    
    function getLastamount (address _addrToken) external override view  returns (uint) { //onlyExchange
        require(amounts[_addrToken].length > 0, "No amount for this token");
        return amounts[_addrToken][amounts[_addrToken].length-1].amount;
    }


    function getallTokens () external override view  returns (address[] memory ) {  //onlyExpert
        return tokens;
    }

    function delToken   (address _addrToken) onlyOwner external override {
        delete amounts[_addrToken];
    }
 



}
