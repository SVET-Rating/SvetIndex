import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import { setNetwork, setError } from '../actions/actions';
import { selectWeb3Instance } from '../selectors/selectors';

const ERROR_MSG = 'Network error in determining the network type';

const getNetworkType = async (web3Instance) => {
  return await web3Instance.eth.net.getNetworkType();
};

function* workerSetInitialData() {
  try {
    const web3Instance = yield select(selectWeb3Instance);
    const network = yield call(getNetworkType, web3Instance);
    yield put(setNetwork(network));
  } catch (e) {
    yield put(setError(ERROR_MSG));
  }
}

export function* watchInitialData() {
  yield takeEvery(TYPES.SET_INITIAL_DATA, workerSetInitialData);
}
