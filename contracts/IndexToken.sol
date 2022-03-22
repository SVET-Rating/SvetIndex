pragma solidity >= 0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iIndextoken.sol";
import "./interfaces/iLstorage.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./openzeppelin-contracts/contracts/GSN/Context.sol";
import "./openzeppelin-contracts/contracts/math/SafeMath.sol";
//./libraries/SafeMath.sol";
 
contract IndexToken is Context, iIndexToken  {
  
    /**
    * makes ERC20 compatible index token 
    */
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

    address factory;
    iLstorage lstorage;

    uint8 private _decimals;
    bool transferEnable;
    bool enableSetActvs;
    Index[] public activesList ;

    
    /**
     * @dev Sets the values for `name`, `symbol`, and `decimals`. All three of
     * these values are immutable: they can only be set once during
     * construction.
     */
    uint8 decimals_; 
    string name_;
    string symbol_;
      
    modifier onlyFactory() {
        require (factory == msg.sender, "Only factory can do this");
        _;
    }

    function setFactory (address _addr, address _lstorage) public onlyFactory
        {
        factory = _addr;
        lstorage = iLstorage(_lstorage);
        }

    function setTransfer (bool _trans) public onlyFactory
        {
            transferEnable = _trans;
        }

    
    constructor (string memory _name, string memory _symbol, address _lstorage ) public {
                        
        decimals_ = 18;
        name_ = _name;
        symbol_ = _symbol;
        factory = msg.sender;
        transferEnable = false;
        enableSetActvs = true;
        lstorage = iLstorage(_lstorage);

        }
    
    function setActivesList ( address[] memory _activesAddr, uint[] memory _activAm) public {
        require(enableSetActvs, "Actives already filled");// TODO: commented  for test, remove comment on prod! 
        if (enableSetActvs) {
        for (uint8 i=0; i<_activesAddr.length; i++) {
            iIndexToken activeT = iIndexToken(_activesAddr[i]);
            activesList.push(Index(_activesAddr[i], _activAm[i], activeT.decimals(), activeT.name(), activeT.symbol()));
            }
            enableSetActvs = false;
        }
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

    function transfer(address recipient, uint amount)  public  override returns (bool) { 
        require(transferEnable, "Transfers not given for token" );
        _transfer(msg.sender, recipient, amount);
         transferActives (msg.sender, recipient, amount);

    }

    function transferFrom(address sender, address recipient, uint256 amount) public  override returns (bool) {
        require(transferEnable, "Transfers not given for token" );
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        
        transferActives (sender, recipient, amount);
        return true;
    }

    function transferActives (address _sender, address _recipient, uint256 _amount)  internal {
        for (uint8 _i = 0; _i<activesList.length; _i++) {
            
            uint amountOfActive = _amount * lstorage.getBalance (_sender, address(this),  activesList[_i].addrActive) /  balanceOf(_sender);
            lstorage.sub (_sender, address(this), activesList[_i].addrActive, amountOfActive);
            lstorage.add (_recipient, address(this), activesList[_i].addrActive, amountOfActive); 
        }

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

    function decimals() public view override   returns (uint8) {
        return decimals_;
    }
    function name() public view  override   returns (string memory) {
        return name_;
    }
    function symbol() public view override   returns (string memory) {
        return symbol_;
    }

    function totalSupply() public view  override returns (uint256) {
        return _totalSupply;
    }


    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view  override returns (uint256) {
        return _balances[account];
    }

        /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view  override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public  override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

        /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public  returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }


    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public  returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

function _transfer(address sender, address recipient, uint256 amount) internal  {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal  {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal  {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal  {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    
    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal  { }

}
