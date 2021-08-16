import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as t from '../actions/types';
import * as a from '../actions/actions';
import * as s from '../selectors/selectors';
import { SWAP_STATE, SWAP_MODE } from '../reducers/reducers-constants';

const PROCESS_ERROR_MSG = 'Error with swap process';

const swapProcessApprove = async ({
  swapContract, assetInContract, swapAmount, coinbaseAddress,
}) => {
  try {
    return (await assetInContract._contract.methods
      .approve(swapContract._address, swapAmount)
      .send({ from: coinbaseAddress }));
  } catch (e) {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

const swapProcess = async ({
  swapContract, assetAddress, swapAmount, delay, discount, swapMode, coinbaseAddress,
}) => {
  try {
    const result = (swapMode === SWAP_MODE.buy)
      ? (await swapContract._contract.methods
        .buyIndexforSvetEth(swapAmount, assetAddress, delay, discount)
        .send({ from: coinbaseAddress, value: '1000000000000000000' }))
      : (await swapContract._contract.methods
        .sellIndexforEth(swapAmount, assetAddress, delay, discount)
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
    yield put(a.setSwapProcessState(SWAP_STATE.end));
  }
}

export function* watchAssetsSwap() {
  yield takeEvery(t.SET_START_SWAP, workerSwapAssets);
}
