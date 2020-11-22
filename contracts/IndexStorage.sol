pragma solidity ^0.6.1;
pragma experimental ABIEncoderV2;
import "./interfaces/iIndexStorage.sol";

contract IndexStorage is iIndexStorage {
    address owner;
    address factory; 
    mapping (bytes32 => address) internal Indexes ;
    
    IndexName[]  IndexList; //todo
    
    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }
    modifier onlyFactory() {
        require (factory == msg.sender, "Only factory can do this");
        _;
    }

    function setFactory (address _addr) public onlyOwner
        {
        factory = _addr;
        }


    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }


    function setIndex (string calldata _name, string calldata _symbol, address _index) external override onlyFactory {
        Indexes[keccak256(abi.encodePacked(_name, _symbol))] = _index;
        IndexList.push(IndexName(_name, _symbol, _index));        
    }

    function getLenIndexes () external view override returns (uint) { //onlyExchange
        return IndexList.length;
    }

    function indexes(string calldata _name, string calldata _symbol) external view override returns (address) {
        return Indexes[keccak256(abi.encodePacked(_name, _symbol))];
    }

    function indexList() external view override returns (IndexName[] memory)
    {
        return IndexList;
    }


}