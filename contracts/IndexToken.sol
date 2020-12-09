pragma solidity ^0.6.1;
pragma experimental ABIEncoderV2;
import "./interfaces/iIndextoken.sol";
import "./openzeppelin-contracts/contracts/token/ERC20/ERC20Detailed.sol";

contract IndexToken is iIndexToken, ERC20Detailed {
  
    /**
    * makes ERC20 compatible index token 
     */

    address factory;
    
    uint8 private _decimals;
    bool transferEnable;
    bool enableSetActvs;
    Index[] internal activesList ;

  //  uint8 private _decimals;
    
    /**
     * @dev Sets the values for `name`, `symbol`, and `decimals`. All three of
     * these values are immutable: they can only be set once during
     * construction.
     */

    modifier onlyFactory() {
        require (factory == msg.sender, "Only factory can do this");
        _;
    }

    function setFactory (address _addr) public onlyFactory
        {
        factory = _addr;
        }

    function setTransfer (bool _trans) public onlyFactory
        {
            transferEnable = _trans;
        }

    constructor (string memory name, string memory symbol ) public ERC20Detailed( name, symbol, 18) {
                        

        factory = msg.sender;
        transferEnable = false;
        enableSetActvs = true;
        
        }
    
    function setActivesList ( address[] memory _activesAddr, uint[] memory _activAm) public {
        require(enableSetActvs, "Actives already filled");
        for (uint8 i=0; i<_activesAddr.length; i++) {
            ERC20Detailed activeT = ERC20Detailed(_activesAddr[i]);
            activesList.push(Index(_activesAddr[i], _activAm[i], activeT.decimals(), activeT.name(), activeT.symbol()));
            }
        enableSetActvs = false;
    }

    function getActivesList() external override view returns (Index[] memory) {
      return activesList;
    }

    function getActivesLen() external override view returns (uint) {
      return activesList.length;
    }
    function getActivesItem(uint _i) external override view returns (address addr,uint amount) {
      require(_i < activesList.length, "No this item");
      addr = activesList[_i].addrActive;
      amount = activesList[_i].amount;
      
    }
        /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount) external override returns (bool) {
        _mint(account, amount);
        return true;
    }
    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) external override {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) external override {
        uint256 decreasedAllowance = allowance(account, _msgSender()).sub(amount, "ERC20: burn amount exceeds allowance");

        _approve(account, _msgSender(), decreasedAllowance);
        _burn(account, amount);
    }

    function transfer(address recipient, uint amount)  public  override (ERC20, IERC20) returns (bool) { 
        require(transferEnable, "Transfers not given for token" );
        super.transfer(recipient, amount);

    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override(ERC20, IERC20)  returns (bool) {
        require(transferEnable, "Transfers not given for token" );
        super.transferFrom(sender, recipient, amount);
    }


    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */


}