import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as t from '../actions/types';
import * as a from '../actions/actions';
import * as s from '../selectors/selectors';

const ERROR_MSG = 'Network error in determining the gas price';

const getGasPrice = async (web3Instance) => {
  try {
    const inWei = await web3Instance.eth.getGasPrice();
    return web3Instance.utils.fromWei(inWei, 'gwei');
  } catch (e) {
    throw new Error(ERROR_MSG);
  }
};

function* workerGetGasPrice() {
  try {
    const web3Instance = yield select(s.selectWeb3Instance);
    const gasPrice = yield call(getGasPrice, web3Instance);
    yield put(a.setGasPrice(gasPrice));
  } catch (e) {
    yield put(a.setError(ERROR_MSG));
  }
}

export function* watchGasPrice() {
  yield takeEvery(t.GET_GAS_PRICE, workerGetGasPrice);
}
