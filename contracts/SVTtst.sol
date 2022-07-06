pragma solidity =0.6.12;


import "./openzeppelin-contracts/contracts/token/ERC20/ERC20Detailed.sol";


contract SVTtst is ERC20Detailed {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply
    ) public ERC20Detailed (name, symbol, 18) {
        _mint(msg.sender, supply);
    }
}