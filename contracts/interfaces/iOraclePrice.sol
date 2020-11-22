pragma solidity ^0.6.1;

interface iOraclePrice {
    function addPrice   (address _addrToken, uint _price ) external;

    function delToken   (address _addrToken) external;
  
    function getLenPrice (address _addrToken) external  view  returns (uint) ;
    
    function getLastPrice (address _addrToken) external view  returns (uint) ;

    function getallTokens () external view  returns (address[] memory ) ;

}