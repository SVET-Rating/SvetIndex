import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as t from '../actions/types';
import * as a from '../actions/actions';
import * as s from '../selectors/selectors';

const ERROR_MSG = 'Network error in determining the network type';

const getNetwork = async (web3Instance) => {
  const [networkType, networkId, chainId] = await Promise.all([
    web3Instance.eth.net.getNetworkType(),
    web3Instance.eth.net.getId(),
    web3Instance.eth.getChainId(),
  ]);

  return {
    networkType,
    networkId,
    chainId,
  };
};

function* workerSetInitialData() {
  try {
    const web3Instance = yield select(s.selectWeb3Instance);

    const network = yield call(getNetwork, web3Instance);
    yield put(a.setNetwork(network));

    const wethAddress = yield call(s.getWEtherAddress, network.networkType);
    const stableAddress = yield call(s.getStableTokenAddress, network.networkType);
    yield put(a.setChainTokens({
      weth: wethAddress,
      stable: stableAddress,
    }));
  } catch (e) {
    yield put(a.setError(ERROR_MSG));
  }
}

export function* watchInitialData() {
  yield takeEvery(t.SET_INITIAL_DATA, workerSetInitialData);
}
