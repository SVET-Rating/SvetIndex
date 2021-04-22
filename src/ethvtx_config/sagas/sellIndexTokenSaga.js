import { call, take, put, fork, takeEvery, cancel } from 'redux-saga/effects'
import { SELL_INDEX_TOKENS,
         SELL_INDEX_START_APPROVE,
         SELL_INDEX_APPROVED,
         SELL_INDEX_TRX_START,
         SELL_INDEX_TRX_PROCESSED,SELL_INDEX_TRX_END} from '../actions/types'


const approveIndexSellProcess = (payload) => {
    var aprove_hash = ""
    let amount_in_wei = web3.utils.toWei(payload.indexTokensAmountForSell);
    return  payload.indexTokenContract._contract.methods
            .approve( payload.sellIndexTokensContract.address, amount_in_wei)
            .send({from: payload.currentAddress});
    
}

const sellIndexTokenProcess = (payload) => {
    let amount_in_wei = web3.utils.toWei(payload.indexTokensAmountForSell);
    return payload.sellIndexTokensContract._contract.methods
           .sellIndexforSvet(amount_in_wei, payload.indexTokenAddress)
           .send({from: payload.currentAddress})
}

function* workerSellIndexToken(action) {
    const payload = action.payload
    yield put({type: SELL_INDEX_START_APPROVE})
    const ahash = yield call(approveIndexSellProcess, payload)
    console.log(ahash.transactionHash)
    yield put({type: SELL_INDEX_APPROVED,payload:{approve_hash:ahash.transactionHash}})
    yield put({type: SELL_INDEX_TRX_START})
    const bhash = yield call(sellIndexTokenProcess, payload)
    yield put({type: SELL_INDEX_TRX_PROCESSED, payload:{buyindex_hash:bhash.transactionHash}})
    //setTimeout(console.log('test timeout'), 1000);
    yield put({type: SELL_INDEX_TRX_END})
}


export function* watchIndexTokenSellProcess() {
    yield takeEvery(SELL_INDEX_TOKENS, workerSellIndexToken)
}

