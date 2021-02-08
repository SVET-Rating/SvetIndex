pragma solidity =0.6.12;
 

import "./Experts.sol";


contract ExpertsRewards {


    Experts experts;

    address owner;

    constructor ()  public {
        owner =  msg.sender;
    }

    mapping (address=> uint) expertsRewards;

    modifier onlyExpert () {
        require (experts.isExpert(msg.sender), "Only expert can do this");
        _;
    }

    modifier onlyOwner () {
        require (msg.sender == owner,"Only owner" );
        _;
    }

    function setNewOwner(address _addrOwner) public onlyOwner {
        owner = _addrOwner;
    }

    function setExpertsContr (address _addrExp) public onlyOwner {
        experts = Experts(_addrExp);
    }


    function rewardExpert (address _addrExpert, uint _amount) public {
        expertsRewards[_addrExpert] += _amount;
    }

    function withdraw (address _addrExpert, uint _amount) public onlyExpert {
        //todo
    }   



}
