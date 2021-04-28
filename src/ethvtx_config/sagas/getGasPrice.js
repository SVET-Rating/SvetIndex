import { call, take, put, fork, takeEvery, cancel } from 'redux-saga/effects'
import {START_INVEST, 
        START_INVEST_PROCESS, 
        GET_GAS_PRICE, 
        START_SELL_INDEX_PROCESS,
        START_SELL_INDEX
        } from '../actions/types'


const getGasPriceAsync = async (stateWeb3) => {
    const gasPrice = await stateWeb3.getGasPrice()
    return gasPrice
}


function* workerStartBuyIndexTokens(action) {
  //amount:svetTokensAmount,address:svetTokensAddress
  const gasPrice = yield call(getGasPriceAsync,action.payload.stateWeb3)
  yield put({type: GET_GAS_PRICE, payload:{ gasPrice }})
  yield put({type: START_INVEST_PROCESS, payload: action.payload})
}

function* workerStartSellIndexTokens(action) {
  console.log('test')
  const gasPrice = yield call(getGasPriceAsync,action.payload.stateWeb3)
  yield put({type: GET_GAS_PRICE, payload:{ gasPrice }})
  yield put({type: START_SELL_INDEX_PROCESS, payload: {}})
}

export function* watchStartBuyIndexTokens() {
    yield takeEvery(START_INVEST, workerStartBuyIndexTokens)
    yield takeEvery(START_SELL_INDEX, workerStartSellIndexTokens)
}