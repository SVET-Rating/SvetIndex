pragma solidity =0.6.12;


interface iLstorage  {

    function add (address _addrOwn, address _addrIndex, address _addrA, uint _amount) external ;
    function sub (address _addrOwn, address _addrIndex, address _addrA, uint _amount) external ;

}