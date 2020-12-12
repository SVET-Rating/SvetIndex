pragma solidity ^0.6.1;
import "./TokTst.sol";
import "./interfaces/iOraclePrice.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";


contract Faucet {


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

    function add2Uniswap (address _addrRout, address _addrOprice, address _WETH) public  {
        
        IUniswapV2Router02 uniswapV2Router02 = IUniswapV2Router02 (_addrRout);
        iOraclePrice oraclePrice =  iOraclePrice (_addrOprice);
        uint priceETH = oraclePrice.getLastPrice(_WETH);
        for (uint8 i=0; i<tokens.length; i++) {
            uniswapV2Router02.addLiquidityETH{ value: 1 ether } (
                tokens[i],
                priceETH / oraclePrice.getLastPrice(tokens[i])  ,
                priceETH / oraclePrice.getLastPrice(tokens[i]) ,
                1 ether,
                msg.sender,
                now + 300
            );
        }

        
    }
        
    function getAddresses () public view  returns  (address[] memory){
   
        return tokens;
    }

}