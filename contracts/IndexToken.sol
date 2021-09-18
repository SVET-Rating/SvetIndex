pragma solidity >= 0.6.12;
pragma experimental ABIEncoderV2;
import "./interfaces/iIndextoken.sol";
import "./interfaces/iLstorage.sol";
import "./openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


contract IndexToken is ERC20 {
  
    /**
    * makes ERC20 compatible index token 
     */

    address factory;
    iLstorage lstorage;

    bool transferEnable;
    bool enableSetActvs;
    Index[] public activesList ;

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

    function setFactory (address _addr, address _lstorage) public onlyFactory
        {
        factory = _addr;
        lstorage = iLstorage(_lstorage);
        }

    function setTransfer (bool _trans) public onlyFactory
        {
            transferEnable = _trans;
        }

    constructor (string memory name, string memory symbol, address _lstorage ) public ERC20(name, symbol) {
                        

        factory = msg.sender;
        transferEnable = false;
        enableSetActvs = true;
        lstorage = iLstorage(_lstorage);

        }
    
    function setActivesList ( address[] memory _activesAddr, uint[] memory _activAm) public {
        require(enableSetActvs, "Actives already filled");// TODO: commented  for test, remove comment on prod! 
        if (enableSetActvs) {
        for (uint8 i=0; i<_activesAddr.length; i++) {
            ERC20 activeT = ERC20(_activesAddr[i]);
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

    function transfer(address recipient, uint amount)  public  override (ERC20) returns (bool) { 
        require(transferEnable, "Transfers not given for token" );
        super.transfer(recipient, amount);
         transferActives (msg.sender, recipient, amount);

    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override(ERC20)  returns (bool) {
        require(transferEnable, "Transfers not given for token" );
        super.transferFrom(sender, recipient, amount);
        transferActives (sender, recipient, amount);
    }

    function transferActives (address _sender, address _recipient, uint256 _amount)  internal {
        for (uint8 _i = 0; _i<activesList.length; _i++) {
            
            uint amountOfActive = _amount * lstorage.getBalance (_sender, address(this),  activesList[_i].addrActive) /  balanceOf(_sender);
            lstorage.sub (_sender, address(this), activesList[_i].addrActive, amountOfActive);
            lstorage.add (_recipient, address(this), activesList[_i].addrActive, amountOfActive); 
        }

    }


}
