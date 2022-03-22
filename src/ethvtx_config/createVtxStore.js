import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { getSagas, getReducers, getInitialState, configureVtx } from 'ethvtx';
import { swapAssetReducer } from './reducers/swapAssetReducer';
import { swapProcessReducer } from './reducers/swapProcessReducer';
import { networkReducer } from './reducers/networkReducer';
import { chainTokensReducer } from './reducers/chainTokensReducer';
import { watchInitialData } from './sagas/initializationSaga';
import { watchAssetsSwap } from './sagas/swapAssetsSaga';
import { watchGasPrice } from './sagas/gasPriceSaga';

export const createVtxStore = () => {
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const initial_state = configureVtx(
    getInitialState(),
    {
      poll_timer: 100,
      confirmation_treshold: 1,
    }
  );

  const reducers = getReducers({
    swapAssetReducer,
    swapProcessReducer,
    networkReducer,
    chainTokensReducer,
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initial_state,
    composer(applyMiddleware(sagaMiddleware)),
  );

  const sagas = getSagas(store, [
    watchInitialData,
    watchGasPrice,
    watchAssetsSwap,
  ]);

  sagaMiddleware.run(sagas);

  return store;
};
