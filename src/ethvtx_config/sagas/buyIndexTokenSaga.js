import { call, take, put, fork, takeEvery, cancelled, race } from 'redux-saga/effects'
import { BUY_INDEX_TOKENS,
         BUY_INDEX_START_APPROVE,
         BUY_INDEX_APPROVED,
         BUY_INDEX_TRX_START,
         BUY_INDEX_TRX_PROCESSED,BUY_INDEX_TRX_END} from '../actions/types'


const approveIndexBuyProcess = async (payload) => {
    var aprove_hash = ""
    let amount_in_wei = await web3.utils.toWei(payload.ITAmount);
    try {
        const hash = await payload.svetToken._contract.methods
            .approve( payload.ITokContract._address, amount_in_wei)
            .send({from: payload.currentAddress})
        return hash
    } catch {
        return false
    }
    
}

const buyIndexTokenProcess = async (payload) => {
    let amount_in_wei = await web3.utils.toWei(payload.ITAmount);
    try {
        const hash = payload.ITokContract._contract.methods
                .buyIndexforSvetEth(amount_in_wei, payload.ITAddress, "600", "100")
                .send({from: payload.currentAddress})
        return hash
    } catch {
        return false
    }
    
}

function* workerBuyIndexToken(action) {
    try {
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
    } catch {
          yield put({type: BUY_INDEX_TRX_END})
    }
    
}


export function* watchIndexTokenBuyProcess() {
    // console.log(payload)
    //const { payload } = yield take(BUY_INDEX_TOKENS, workerBuyIndexToken)
    //yield call(workerBuyIndexToken, payload)
    yield takeEvery(BUY_INDEX_TOKENS, workerBuyIndexToken)
    
    //yield cancel(workerBuyIndexToken)
}