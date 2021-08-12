import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as t from '../actions/types';
import * as a from '../actions/actions';
import * as s from '../selectors/selectors';

const ERROR_MSG = 'Error in OraclePrice';
const ORACLE_ERROR_MSG = 'Error in OraclePrice method';

const getPrice = async (contract, address, web3Instance) => {
  const amount = web3Instance.utils.toWei('1');
  try {
    return (await contract._contract.methods
      .getIndexPriceforAmount(address, amount)
      .call()
    );
  } catch (e) {
    throw new Error(ORACLE_ERROR_MSG);
  }
};

function* workerAssetPrice({ payload: { address } }) {
  try {
    const web3Instance = yield select(s.selectWeb3Instance);
    const contract = yield select(s.selectOraclePriceContract);
    const price = yield call(getPrice, contract, address, web3Instance);
    yield put(a.setAssetPrice({ address, price }));
  } catch (e) {
    yield put(a.setError(ERROR_MSG));
  }
}

export function* watchAssetPrice() {
  yield takeEvery(t.GET_ASSET_PRICE, workerAssetPrice);
}
