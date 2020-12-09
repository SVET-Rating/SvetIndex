pragma solidity ^0.6.1;
pragma experimental ABIEncoderV2;

import "./IndexToken.sol";
import "./interfaces/iOraclePrice.sol";
import "./interfaces/iOracleCircAmount.sol";
import "./interfaces/iOracleTotSupply.sol";
import "./interfaces/iIndexStorage.sol"; //todo intertface

contract IndexFactory  {

    // is needed to list of products? 

    address owner;
    iOraclePrice oraclePrice;
    iOracleCircAmount oracleCircAmount;
    iOracleTotSupply oracleTotSupply;
    iIndexStorage indexStorage;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setIndexStorage (address _addr) public onlyOwner
        {
        indexStorage = iIndexStorage(_addr);
        }

    function setPriceOracle(address _addr) public onlyOwner
        {
        oraclePrice = iOraclePrice(_addr);
        }

    function setAmountOracle(address _addr) public onlyOwner
        {
        oracleCircAmount = iOracleCircAmount(_addr);
        }

    function setTotSupply(address _addr) public onlyOwner
        {
        oracleTotSupply = iOracleTotSupply(_addr);
        }

    

    function makeIndex (address _indexAddr, address[] memory _actives) public onlyOwner returns (address) { // string memory _name, string memory _symbol,
        IndexToken indexT =  IndexToken (_indexAddr);
        string memory name = indexT.name();
        string memory symbol =  indexT.symbol();
        //require (indexStorage.indexes(name, symbol) == address(0x0), "Same name+symbol exists"); TODO: commented  for test, remove comment on prod! 
        uint[] memory activesAm = new uint[](_actives.length);
        
        for (uint8 i=0; i<_actives.length; i++) {
            uint price =  oraclePrice.getLastPrice(_actives[i]);        
            require(price > 0, "No price for token");
            uint ts = oracleTotSupply.getLastamount(_actives[i]);
            require(ts > 0, "No total supply for token");
            uint amount = oracleCircAmount.getLastamount(_actives[i]);
            require(amount > 0, "No circ. amount for token");         
            activesAm[i] = amount * price / ts / _actives.length;
        }

        
        indexT.setActivesList(_actives, activesAm);
        indexStorage.setIndex(name, symbol, address(indexT));
        return address(indexT); //indexT

    }

        function setTransfer (address _index, bool _trans) public onlyOwner
        {
            IndexToken indexT =   IndexToken (_index);
            indexT.setTransfer (_trans);
        }


}