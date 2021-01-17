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
        
    function getAddresses () public view  returns  (address[] memory){
   
        return tokens;
    }
    
    function add2Uniswap (address _addrRout, address _addrOprice, address _WETH, address _addrFactory) public payable {
       // revert (string(abi.encodePacked(msg.value)));
        IUniswapV2Router02 uniswapV2Router02 = IUniswapV2Router02 (_addrRout);
      //  IUniswapV2Factory uniswapV2Factory = IUniswapV2Factory (_addrFactory);
        iOraclePrice oraclePrice =  iOraclePrice (_addrOprice);
        uint priceETH = oraclePrice.getLastPrice(_WETH);
        require (priceETH > 0, "need priceETH > 0");
     
        for (uint8 i=0; i<tokens.length; i++) {
            uint priceToken = oraclePrice.getLastPrice(tokens[0]);
            
            require (priceToken > 0, "need priceToken > 0");
            /*if (uniswapV2Factory.getPair(tokens[0], _WETH) == address(0)) {
                   
                uniswapV2Factory.createPair(tokens[0], _WETH);
            
            } */
           // revert("3");
            uniswapV2Router02.addLiquidityETH { value: 100000000000000000}(
                tokens[0],
                priceETH / priceToken  ,
                priceETH /priceToken ,
                100000000000000000,
                msg.sender,
                now 
            );
            }   
        }

}