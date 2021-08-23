import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as t from '../actions/types';
import * as a from '../actions/actions';
import * as s from '../selectors/selectors';
import { SWAP_STATE, SWAP_MODE } from '../reducers/reducers-constants';

const PROCESS_ERROR_MSG = 'Error with swap process';

const swapProcessApprove = async ({
  swapContract, assetInContract, swapInAmount, coinbaseAddress,
}) => {
  try {
    return (await assetInContract._contract.methods
      .approve(swapContract._address, swapInAmount)
      .send({ from: coinbaseAddress }));
  } catch (e) {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

const swapProcess = async ({
  swapContract, assetAddress, swapInAmount, swapOutAmount, delay, discount, swapMode, coinbaseAddress,
}) => {
  try {
    const result = (swapMode === SWAP_MODE.buy)
      ? (await swapContract._contract.methods
        .buyIndexforSvetEth(swapInAmount, assetAddress, delay, discount)
        .send({ from: coinbaseAddress, value: swapOutAmount }))
      : (await swapContract._contract.methods
        .sellIndexforEth(swapInAmount, assetAddress, delay, discount)
        .send({ from: coinbaseAddress }));

    return result;
  } catch (e) {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

function* workerSwapAssets() {
  yield put(a.setSwapProcessState(SWAP_STATE.start));
  try {
    const swapData = yield select(s.selectDataToSwap);
    if (swapData.swapMode === SWAP_MODE.sell) {
      yield call(swapProcessApprove, swapData);
      yield put(a.setSwapProcessState(SWAP_STATE.approve));
    }
    yield call(swapProcess, swapData);
  } catch (e) {
    yield put(a.setError(e.message));
  } finally {
    yield put(a.setSwapEnd());
  }
}

export function* watchAssetsSwap() {
  yield takeEvery(t.SET_SWAP_START, workerSwapAssets);
}
