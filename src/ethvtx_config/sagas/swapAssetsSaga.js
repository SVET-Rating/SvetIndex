import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import * as actions from '../actions/actions';
import { selectDataToSwap } from '../selectors/selectors';
import { SWAP_STATE, SWAP_MODE } from '../reducers/reducers-constants';

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with swap process';

const approveSwapProcess = async ({
  svetTokenContract, swapContract, assetInContract, swapMode, swapAmount, coinbaseAddress,
}) => {
  try {
    const result = (swapMode === SWAP_MODE.buy)
      ? (await svetTokenContract._contract.methods
        .approve(swapContract._address, swapAmount)
        .send({ from: coinbaseAddress }))
      : (await assetInContract._contract.methods
        .approve(swapContract._address, swapAmount)
        .send({ from: coinbaseAddress }));
    return result;
  } catch (e) {
    throw new Error(APPROVE_ERROR_MSG);
  }
};

const swapProcess = async ({
  swapContract, assetAddress, swapAmount, delay, discount, swapMode, coinbaseAddress,
}) => {
  try {
    const result = (swapMode === SWAP_MODE.buy)
      ? (await swapContract._contract.methods
        .buyIndexforSvetEth(swapAmount, assetAddress, delay, discount)
        .send({ from: coinbaseAddress }))
      : (await swapContract._contract.methods
        .sellIndexforSvet(swapAmount, assetAddress, delay, discount)
        .send({ from: coinbaseAddress }));
    return result;
  } catch (e) {
    throw new Error(PROCESS_ERROR_MSG);
  }
};

function* workerSwapAssets() {
  try {
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
