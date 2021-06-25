import { call, take, put, fork, takeEvery, cancelled, race } from 'redux-saga/effects'
import { BUY_INDEX_TOKENS,
         BUY_INDEX_START_APPROVE,
         BUY_INDEX_APPROVED,
         BUY_INDEX_TRX_START,
         BUY_INDEX_TRX_PROCESSED,BUY_INDEX_TRX_END,
         BUY_INDEX_TRX_FAILED,
} from '../actions/types'

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with buy process';

const approveIndexBuyProcess = async (payload) => {
    let amount_in_wei = await web3.utils.toWei(payload.ITAmount);
    try {
        const hash = await payload.svetToken._contract.methods
            .approve( payload.ITokContract._address, amount_in_wei)
            .send({from: payload.currentAddress})

      // Если может вернуться не валидный 'hash',
      // то здесь нужно выполнить проверку и выкинуть ошибку ('throw new Error()')
        console.log(hash);
        return hash
    } catch {
      throw new Error(APPROVE_ERROR_MSG);
    }
}

const buyIndexTokenProcess = async (payload) => {
    let amount_in_wei = await web3.utils.toWei(payload.ITAmount);
    try {
      const hash = payload.ITokContract._contract.methods
                .buyIndexforSvetEth(amount_in_wei, payload.ITAddress, "600", "100")
                .send({from: payload.currentAddress})

        // Если может вернуться не валидный 'hash',
        // то здесь нужно выполнить проверку и выкинуть ошибку ('throw new Error()')
        console.log(hash);
        return hash
    } catch {
      throw new Error(PROCESS_ERROR_MSG);
    }
}

function* workerBuyIndexToken({ payload }) {
    try {
        yield put({type: BUY_INDEX_START_APPROVE})
        const ahash = yield call(approveIndexBuyProcess, payload)
        yield put({type: BUY_INDEX_APPROVED,payload:{approve_hash:ahash.transactionHash}})
        yield put({type: BUY_INDEX_TRX_START})
        const bhash = yield call(buyIndexTokenProcess, payload)
        yield put({type: BUY_INDEX_TRX_PROCESSED, payload:{buyindex_hash:bhash.transactionHash}})
        yield put({type: BUY_INDEX_TRX_END})
    } catch (e) {
      // yield put({type: BUY_INDEX_TRX_END})
      yield put({ type: BUY_INDEX_TRX_FAILED, payload: { hasError: e.message } });
    }
}


export function* watchIndexTokenBuyProcess() {
    // console.log(payload)
    //const { payload } = yield take(BUY_INDEX_TOKENS, workerBuyIndexToken)
    //yield call(workerBuyIndexToken, payload)
    yield takeEvery(BUY_INDEX_TOKENS, workerBuyIndexToken)

    //yield cancel(workerBuyIndexToken)
}
