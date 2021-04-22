import { call, take, put, fork, takeEvery, cancel } from 'redux-saga/effects'
import { BUY_INDEX_TOKENS,
         BUY_INDEX_START_APPROVE,
         BUY_INDEX_APPROVED,
         BUY_INDEX_TRX_START,
         BUY_INDEX_TRX_PROCESSED,BUY_INDEX_TRX_END} from '../actions/types'


const approveIndexBuyProcess = (payload) => {
    var aprove_hash = ""
    let amount_in_wei = web3.utils.toWei(payload.ITAmount);
    return payload.svetToken._contract.methods
        .approve( payload.ITokContract._address, amount_in_wei)
        .send({from: payload.currentAddress})
}

const buyIndexTokenProcess = (payload) => {
    let amount_in_wei = web3.utils.toWei(payload.ITAmount);
    return payload.ITokContract._contract.methods
                .buyIndexforSvetEth(amount_in_wei, payload.ITAddress)
                .send({from: payload.currentAddress})
}

function* workerBuyIndexToken(action) {
    const payload = action.payload
    yield put({type: BUY_INDEX_START_APPROVE})
    const ahash = yield call(approveIndexBuyProcess, payload)
    console.log(ahash.transactionHash)
    yield put({type: BUY_INDEX_APPROVED,payload:{approve_hash:ahash.transactionHash}})
    yield put({type: BUY_INDEX_TRX_START})
    const bhash = yield call(buyIndexTokenProcess, payload)
    yield put({type: BUY_INDEX_TRX_PROCESSED, payload:{buyindex_hash:bhash.transactionHash}})
    //setTimeout(console.log('test timeout'), 1000);
    yield put({type: BUY_INDEX_TRX_END})
}


export function* watchIndexTokenBuyProcess() {
    // console.log(payload)
    //const { payload } = yield take(BUY_INDEX_TOKENS, workerBuyIndexToken)
    //yield call(workerBuyIndexToken, payload)
    yield takeEvery(BUY_INDEX_TOKENS, workerBuyIndexToken)
    
    //yield cancel(workerBuyIndexToken)
}