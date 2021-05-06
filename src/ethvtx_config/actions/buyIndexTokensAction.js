import {BUY_INDEX_TOKENS, 
        BUY_SVET_TOKENS_BY_ETHER,
        BUY_INDEX_START_APPROVE,
        BUY_INDEX_APPROVED,
        BUY_INDEX_TRX_START,
        BUY_INDEX_TRX_PROCESSED} from './types';

const approveIndexBuyStart = () => {
    return {
        type: BUY_INDEX_START_APPROVE,
    }
}
const approveIndexBuyProcess = (ITokContract, ITAmount, ITAddress,currentAddress, svetToken) => {
    var aprove_hash = ""
    let amount_in_wei = web3.utils.toWei(ITAmount);
    svetToken._contract.methods
        .approve( ITokContract._address, amount_in_wei)
        .send({from: currentAddress}).then((reciept) => {
           aprove_hash = reciept.transactionHash
        })

    return {
        type: BUY_INDEX_APPROVED,
        payload: {aprove_hash, buyindex_hash: ""}
    }
}

const buyIndexStart = () => {
    
    return {
        type: BUY_INDEX_TRX_START,
        payload: {}
    }
}

const buyIndexProcess = (ITokContract, ITAmount, ITAddress,currentAddress, svetToken) => {
    var buyindex_hash = ""
    let amount_in_wei = web3.utils.toWei(ITAmount);
    ITokContract._contract.methods
                .buyIndexforSvetEth(amount_in_wei, ITAddress,  "600", "100")
                .send({from: currentAddress}).then((reciept) => {
                   buyindex_hash = reciept.transactionHash
                   
                })
    return {
        type: BUY_INDEX_TRX_PROCESSED,
        payload: {buyindex_hash,aprove_hash:""}
    }
}

const formBuyIndexTokens = (ITokContract, ITAmount, ITAddress,currentAddress, svetToken) => {
    
    return {
        type:BUY_INDEX_TOKENS,
        payload: {ITokContract, ITAmount, ITAddress,currentAddress, svetToken}
    }
    
    
}

export default formBuyIndexTokens;