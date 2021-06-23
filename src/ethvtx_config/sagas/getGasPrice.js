import { call, take, put, fork, takeEvery, cancelled } from 'redux-saga/effects'
import {START_INVEST,
        START_INVEST_PROCESS,
        GET_GAS_PRICE,
        START_SELL_INDEX_PROCESS,
        START_SELL_INDEX,
        BUY_INDEX_TRX_END,
        BUY_INDEX_TRX_FAILED,
        SELL_INDEX_TRX_FAILED,
        } from '../actions/types'

const ERROR_MSG = 'Network error in determining the gas price';

const getGasPriceAsync = async (stateWeb3) => {
    const gasPrice = await stateWeb3.getGasPrice()
    return gasPrice
}


function* workerStartBuyIndexTokens(action) {
  //amount:svetTokensAmount,address:svetTokensAddress
  try {
    const gasPrice = yield call(getGasPriceAsync,action.payload.stateWeb3)
    yield put({type: GET_GAS_PRICE, payload:{ gasPrice: (gasPrice/100000000) }})
    yield put({type: START_INVEST_PROCESS, payload: action.payload})
  // } finally {
  //   if (yield cancelled()) {
  //     yield put({type: BUY_INDEX_TRX_END})
  //   }
  // }
  } catch {
    yield put({ type: BUY_INDEX_TRX_FAILED, payload: { hasError: ERROR_MSG } });
  }
}

function* workerStartSellIndexTokens(action) {
  try {
    const gasPrice = yield call(getGasPriceAsync,action.payload.stateWeb3)
    yield put({type: GET_GAS_PRICE, payload:{ gasPrice: (gasPrice/100000000)  }})
    yield put({type: START_SELL_INDEX_PROCESS, payload: {}})
  } catch {
    yield put({ type: SELL_INDEX_TRX_FAILED, payload: { hasError: ERROR_MSG } });
  }
}

export function* watchStartBuyIndexTokens() {
    yield takeEvery(START_INVEST, workerStartBuyIndexTokens)
    yield takeEvery(START_SELL_INDEX, workerStartSellIndexTokens)
}
