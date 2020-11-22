pragma solidity ^0.6.1;


interface iLstorage  {

    function add (address _addrIndex, address _addrA, uint _amount) external ;
    function sub (address _addrIndex, address _addrA, uint _amount) external ;

}