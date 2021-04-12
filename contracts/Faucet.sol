pragma solidity =0.6.12;
import "./TokTst.sol";
import "./interfaces/iOraclePrice.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Faucet {

event CreatePair(address pair,uint price);

mapping (address => uint256) listTakers;
address[]  tokens;

    function setTokens (address[] memory _tok) public{
        for (uint8 i=0; i<_tok.length; i++) {
            tokens.push(_tok[i]);
        }
    }

    function setToken (address _tok) public{
      
            tokens.push(_tok);
        
    }

    function sendTokens () public  {
        require (listTakers[msg.sender] == 0 || listTakers[msg.sender] + 3600 < now,
         "You can request just once per 60 min");
        for (uint8 i=0; i<tokens.length; i++) {
            TokTst toktst = TokTst(tokens[i]);
            toktst.transfer(msg.sender, 10*10 ** uint(toktst.decimals()));
           
        }

            listTakers[msg.sender] = now; 
        
    }

    function add2Uniswap (address _addrRout, address _addrOprice, 
                        address _WETH, address _addrFactory) public payable {
       // revert (string(abi.encodePacked(msg.value)));
        IUniswapV2Router02 uniswapV2Router02 = IUniswapV2Router02 (_addrRout);
        IUniswapV2Factory uniswapV2Factory = IUniswapV2Factory (_addrFactory);
        iOraclePrice oraclePrice =  iOraclePrice (_addrOprice);
        uint priceWETH = oraclePrice.getLastPrice(_WETH);
        require (priceWETH > 0, "need priceETH > 0");
     
        uint priceToken = oraclePrice.getLastPrice(tokens[0]);
        
        require (priceToken > 0, "need priceToken > 0");
        /*
        if (uniswapV2Factory.getPair(_WETH, tokens[0]) == address(0)) {
               
            uniswapV2Factory.createPair(_WETH,tokens[0]);
        
        }
        address uniswapPairToken = uniswapV2Factory.getPair(_WETH, tokens[0]); 
        ERC20 token = ERC20(tokens[0]);
        token.approve(msg.sender, 100000000000000000);
        emit CreatePair(uniswapPairToken, priceWETH/priceToken);
        */
        uniswapV2Router02.addLiquidityETH(
            tokens[0],
            10,
            1,
            msg.value/tokens.length,
            address(this),
            now+86
        );
        

        
    }
        
    function getAddresses () public view  returns  (address[] memory){
   
        return tokens;
    }

}
