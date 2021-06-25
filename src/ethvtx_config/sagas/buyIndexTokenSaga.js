import { call, put, takeEvery } from 'redux-saga/effects';
import {
  BUY_INDEX_TOKENS,
  BUY_INDEX_START_APPROVE,
  BUY_INDEX_APPROVED,
  BUY_INDEX_TRX_START,
  BUY_INDEX_TRX_PROCESSED,
  BUY_INDEX_TRX_END,
  BUY_INDEX_TRX_FAILED,
} from '../actions/types';

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with buy process';

const approveIndexBuyProcess = async (payload) => {
  const amount_in_wei = web3.utils.toWei(payload.ITAmount);
  try {
    return (await payload.svetToken._contract.methods
      .approve(payload.ITokContract._address, amount_in_wei)
      .send({ from: payload.currentAddress }));
  } catch {
    throw new Error(APPROVE_ERROR_MSG);
  }
};

const buyIndexTokenProcess = async (payload) => {
  const amount_in_wei = web3.utils.toWei(payload.ITAmount);
  try {
    return (await payload.ITokContract._contract.methods
      .buyIndexforSvetEth(amount_in_wei, payload.ITAddress, "600", "100")
      .send({ from: payload.currentAddress }));
  } catch {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

function* workerBuyIndexToken({ payload }) {
  try {
    yield put({ type: BUY_INDEX_START_APPROVE });
    const ahash = yield call(approveIndexBuyProcess, payload);
    yield put({ type: BUY_INDEX_APPROVED, payload: { approve_hash: ahash.transactionHash }});
    yield put({ type: BUY_INDEX_TRX_START });
    const bhash = yield call(buyIndexTokenProcess, payload);
    yield put({ type: BUY_INDEX_TRX_PROCESSED, payload: { buyindex_hash: bhash.transactionHash }});
    yield put({ type: BUY_INDEX_TRX_END });
  } catch (e) {
    yield put({ type: BUY_INDEX_TRX_FAILED, payload: { hasError: e.message }});
  }
}

export function* watchIndexTokenBuyProcess() {
  yield takeEvery(BUY_INDEX_TOKENS, workerBuyIndexToken);
}
