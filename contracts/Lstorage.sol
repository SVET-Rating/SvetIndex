pragma solidity ^0.6.1;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./interfaces/iLstorage.sol";

contract Lstorage is iLstorage {
    using SafeMath  for uint;
    address owner;
    address swap;
    mapping (address => mapping (address =>  uint)) liq; 

        constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }
    modifier onlyswap() {
        require (swap == msg.sender, "Only swap can do this");
        _;
    }

    function setswap (address _addr) public onlyOwner
        {
        swap = _addr;
        }


    function add (address _addrIndex, address _addrA, uint _amount) external override onlyswap {

        liq [_addrIndex][_addrA].add( _amount);

    }

    function sub (address _addrIndex, address _addrA, uint _needLiq) external override {

        require(liq [ _addrIndex][_addrA] - _needLiq > 0 , "no liq on this index");
        liq [ _addrIndex][_addrA].sub(_needLiq);

    }

}