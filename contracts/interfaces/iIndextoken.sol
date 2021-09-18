pragma solidity >=0.6.12;
pragma experimental ABIEncoderV2;
import "./IERC20Uniswap.sol";
  
interface iIndexToken is IERC20Uniswap {
    struct Index { 
      address addrActive; // addr of active's token
      uint256 amount; // in wei    
      uint decimals; 
      string name;
      string symbol;
    }

    function getActivesList() external view returns (Index[] memory) ;
    function getActivesLen() external  view returns (uint) ;
    function getActivesItem(uint ) external  view returns (address ,uint );
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount) external ;
    function mint(address account, uint256 amount) external  returns (bool);
}
