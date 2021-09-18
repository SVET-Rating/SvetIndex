pragma solidity =0.6.12;
import "./openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

abstract contract TokTst is ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

  constructor (string memory name, string memory symbol, uint8 decimals ) public      
        ERC20( name, symbol) {
      _name = name;
      _symbol = symbol;
       _decimals = 18;
      _mint(msg.sender, 21000000 * 10**uint(_decimals));
    }


}