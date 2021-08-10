import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import * as actions from '../actions/actions';
import { selectDataToSwap } from '../selectors/selectors';
import { SWAP_STATE, SWAP_MODE } from '../reducers/reducers-constants';

const APPROVE_ERROR_MSG = 'Error with approve process';
const PROCESS_ERROR_MSG = 'Error with swap process';

const approveSwapProcess = async ({
  ERC20Contract, assetAddress, swapAmount, coinbaseAddress,
}) => {
  console.log(swapAmount)
  try {
    return (await ERC20Contract._contract.methods
      .approve(assetAddress, swapAmount)
      .send({ from: coinbaseAddress }));
  } catch (e) {
    console.log(e)
    throw new Error(APPROVE_ERROR_MSG);
  }
};

const swapProcess = async ({
  IndexSwapContract, assetAddress, swapAmount, delay, discount, swapMode, coinbaseAddress,
}) => {
  try {
    return swapMode === SWAP_MODE.buy
      ? (await IndexSwapContract._contract.methods
          .swapInd4Eth(assetAddress, swapAmount, delay, discount)
          .send({ from: coinbaseAddress }))
      : (await IndexSwapContract._contract.methods
          .sellIndexforEth(swapAmount, assetAddress, delay, discount)
          .send({ from: coinbaseAddress }))
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
