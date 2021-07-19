import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import * as actions from '../actions/actions';
import { SWAP_STATE, SWAP_MODE } from '../reducers/reducers-constants';

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with swap process';

const approveSwapProcess = async ({
  swapContract, swapInAmount, coinbaseAddress,
}) => {
  try {
    return (await swapContract.fn
      .approve(swapContract.address, swapInAmount)
      .send({ from: coinbaseAddress }));
  } catch (e) {
    throw new Error(APPROVE_ERROR_MSG);
  }
};

const swapProcess = async ({
  assetInAddress, swapInAmount, delay, slippage, swapMode, coinbaseAddress,
}) => {
  try {
    return swapMode === SWAP_MODE.buy
      ? (await ITokContract._contract.methods
          .buyIndexforSvetEth(swapInAmount, assetInAddress, delay, slippage)
          .send({ from: coinbaseAddress }))
      : (await sellIndexTokensContract._contract.methods
          .sellIndexforSvet(swapInAmount, assetInAddress, delay, slippage)
          .send({ from: coinbaseAddress }))
  } catch (e) {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

function* workerSwapAssets() {
  try {
    // const ahash = yield call(approveIndexSellProcess, payload);
    // yield put({ type: SELL_INDEX_APPROVED, payload: { approve_hash: ahash.transactionHash }});
    // yield put({ type: SELL_INDEX_TRX_START });
    // const bhash = yield call(sellIndexTokenProcess, payload);
    // yield put({ type: SELL_INDEX_TRX_PROCESSED, payload: { buyindex_hash: bhash.transactionHash }});
    // yield put({ type: SELL_INDEX_TRX_END });
    yield put(actions.setSwapProcessState(SWAP_STATE.start));
    const swapData = yield select(selectDataToSwap);
    yield call(approveSwapProcess, swapData);
    yield put(actions.setSwapProcessState(SWAP_STATE.approve));
    yield call(swapProcess, swapData);
  } catch (e) {
    yield put(actions.setError(e.message));
  } finally {
    yield put(actions.setSwapProcessState(SWAP_STATE.end));
  }
}

export function* watchAssetsSwap() {
  yield takeEvery(TYPES.SET_START_SWAP, workerSwapAssets);
}
