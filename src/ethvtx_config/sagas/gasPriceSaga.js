import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import { setGasPrice, setError } from '../actions/actions';
import { selectWeb3Instance } from '../selectors/selectors';

const ERROR_MSG = 'Network error in determining the gas price';

const getGasPrice = async (web3Instance) => {
  const wei = await web3Instance.eth.getGasPrice();
  return web3Instance.utils.fromWei(wei, 'gwei');
};

function* workerGetGasPrice() {
  try {
    const web3Instance = yield select(selectWeb3Instance);
    const gasPrice = yield call(getGasPrice, web3Instance);
    yield put(setGasPrice(gasPrice));
  } catch (e) {
    yield put(setError(ERROR_MSG));
  }
}

export function* watchGasPrice() {
  yield takeEvery(TYPES.SET_GAS_PRICE, workerGetGasPrice);
  // yield takeEvery(START_SELL_INDEX, workerStartSellIndexTokens);
}
