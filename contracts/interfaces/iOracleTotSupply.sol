pragma solidity =0.6.12;

interface iOracleTotSupply {
    function addamount   (address _addrToken, uint _amount ) external ;

    function delToken   (address _addrToken) external ;
  
    function getLenamount (address _addrToken) external  view  returns (uint) ;
    
    function getLastamount (address _addrToken) external  view  returns (uint) ;

    function getallTokens () external  view  returns (address[] memory ) ;

}