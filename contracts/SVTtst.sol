pragma solidity =0.6.12;


import "./openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";



abstract contract SVTtst is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply
    ) public ERC20(name, symbol) {
        _mint(msg.sender, supply);
    }
}