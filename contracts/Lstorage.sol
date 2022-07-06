pragma solidity =0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./interfaces/iLstorage.sol";
import "@openzeppelin/upgrades-core/contracts/Initializable.sol";


contract Lstorage is iLstorage, Initializable {
    using SafeMath  for uint;
    address owner;
    address swap;
    mapping  (address => mapping  (address => mapping (address =>  uint)))  liq; 

        /* constructor */
    function initialize () public {
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


    function add (address _addrOwn, address _addrIndex, address _addrA, uint _amount) external override onlyswap {

        liq [_addrOwn][_addrIndex][_addrA] +=  _amount;

    }

    function sub (address _addrOwn, address _addrIndex, address _addrA, uint _needLiq) external override {
        require(liq [_addrOwn][ _addrIndex][_addrA] >= _needLiq  , "no liq on this index");
        liq [_addrOwn][ _addrIndex][_addrA] -= _needLiq;

    }

    function getBalance (address _addrOwn, address _addrIndex, address _addrA) external view override returns (uint) {
        return liq[_addrOwn][_addrIndex][_addrA];
    }

}