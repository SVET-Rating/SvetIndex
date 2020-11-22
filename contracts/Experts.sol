pragma solidity ^0.6.1;
 

contract Experts {
    address owner;

    constructor ()  public {
        owner =  msg.sender;
    }

    mapping (address => bool) internal experts;


    modifier onlyOwner () {
        require (msg.sender == owner,"Only owner" );
        _;
    }
    
    function setNewOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }


    function addExpert  (address _addrExp) public onlyOwner {
        experts [_addrExp] = true;
    }
    function delExpert  (address _addrExp) public onlyOwner {
        experts [_addrExp] = false;
    }


    function setOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }

    function isExpert (address _addr) external view returns (bool) {
        return experts[_addr];
    }

}
