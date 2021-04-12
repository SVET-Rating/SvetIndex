pragma solidity =0.6.12;
pragma experimental ABIEncoderV2;

import "./Experts.sol";


contract ExpertPrices {

   address owner; 

   constructor ()  public {
        owner =  msg.sender;
    }
    modifier onlyOwner () {
        require (msg.sender == owner,"Only owner" );
        _;
    }
   function setNewOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
    

    /**    
     * TODO 
        1. experts puts prices from their ETH accounts
        2. contract calculates average price (how?)
        3. result sends to OraclePrices.addPrice
     */
}