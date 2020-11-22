pragma solidity ^0.6.1;
import "./TokTst.sol";


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

}