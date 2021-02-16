import {BUY_INDEX_TOKENS} from './types';

const formBuyIndexTokens = (ITokContract, ITAmount, ITAddress,currentAddress, svetToken) => {
    console.log(ITokContract)
    let amount_in_wei = web3.utils.toWei(ITAmount);
    if (ITokContract != undefined && ITAmount != 0) {
        svetToken._contract.methods.approve( ITokContract._address, amount_in_wei).send({from: currentAddress}).then(() => 
        {ITokContract._contract.methods.buyIndexforSvetEth(amount_in_wei, ITAddress).send({from: currentAddress});})
                           /**       */
    }
    
    return {
        type:BUY_INDEX_TOKENS,
        payload: ITAmount
    }
}

export default formBuyIndexTokens;