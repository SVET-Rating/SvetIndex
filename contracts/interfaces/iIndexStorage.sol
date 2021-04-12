pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;

interface iIndexStorage {
    struct IndexName { 
        string name;
        string symbol;
        address addr;
    }

    //mapping (bytes32 => address) public indexes ;
    function indexes (string calldata _name, string calldata _symbol ) external view returns (address);

    function setIndex (string calldata _name, string calldata _symbol, address _index) external ;

    function getLenIndexes () external view  returns (uint);
    function indexList() external view returns (IndexName[] memory);

}