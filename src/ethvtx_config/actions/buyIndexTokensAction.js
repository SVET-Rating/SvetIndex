import {BUY_INDEX_TOKENS} from './types';

const formBuyIndexTokens = (ITokContract, ITAmount, ITAddress,currentAddress) => {
    console.log(ITokContract)
    let amount_in_wei = web3.utils.toBN(ITAmount);
    if (ITokContract != undefined && ITAmount != 0) {
        const IndexToken = ITokContract._contract.methods.buyIndexforSvetEth(amount_in_wei, ITAddress)
                           .send({from: currentAddress});
    }
    
    return {
        type:BUY_INDEX_TOKENS,
        payload: ITAmount
    }
}

export default formBuyIndexTokens;