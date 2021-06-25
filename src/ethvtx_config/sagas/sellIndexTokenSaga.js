import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SELL_INDEX_TOKENS,
  SELL_INDEX_START_APPROVE,
  SELL_INDEX_APPROVED,
  SELL_INDEX_TRX_START,
  SELL_INDEX_TRX_PROCESSED,
  SELL_INDEX_TRX_END,
  SELL_INDEX_TRX_FAILED,
} from '../actions/types';

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with sell process';

const approveIndexSellProcess = async (payload) => {
  const amount_in_wei = web3.utils.toWei(payload.indexTokensAmountForSell);
  try {
    return (await payload.indexTokenContract._contract.methods
      .approve(payload.sellIndexTokensContract.address, amount_in_wei)
      .send({ from: payload.currentAddress }));
  } catch {
    throw new Error(APPROVE_ERROR_MSG);
  }
};

const sellIndexTokenProcess = async (payload) => {
  const amount_in_wei = web3.utils.toWei(payload.indexTokensAmountForSell);
  try {
    return (await payload.sellIndexTokensContract._contract.methods
      .sellIndexforSvet(amount_in_wei, payload.indexTokenAddress, "600", "100")
      .send({ from: payload.currentAddress }));
  } catch {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

function* workerSellIndexToken({ payload }) {
  try {
    yield put({ type: SELL_INDEX_START_APPROVE });
    const ahash = yield call(approveIndexSellProcess, payload);
    yield put({ type: SELL_INDEX_APPROVED, payload: { approve_hash: ahash.transactionHash }});
    yield put({ type: SELL_INDEX_TRX_START });
    const bhash = yield call(sellIndexTokenProcess, payload);
    yield put({ type: SELL_INDEX_TRX_PROCESSED, payload: { buyindex_hash: bhash.transactionHash }});
    yield put({ type: SELL_INDEX_TRX_END });
  } catch (e) {
    yield put({ type: SELL_INDEX_TRX_FAILED, payload: { hasError: e.message }});
  }
}

export function* watchIndexTokenSellProcess() {
  yield takeEvery(SELL_INDEX_TOKENS, workerSellIndexToken);
}
