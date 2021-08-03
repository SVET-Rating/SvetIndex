import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { getSagas, getReducers, getInitialState, configureVtx } from 'ethvtx';
import r from './reducers';
// import { watchIndexTokenBuyProcess } from './sagas/buyIndexTokenSaga';
// import { watchIndexTokenSellProcess } from './sagas/sellIndexTokenSaga';
// import { watchStartBuyIndexTokens } from './sagas/getGasPrice';

export const createVtxStore = () => {
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // You can configure some parameters here to inject them with the initial state
  const initial_state = configureVtx(getInitialState(), {
    poll_timer: 500,
    confirmation_treshold: 5,
  });

  // Recover the vortex reducers. This method takes your custom reducers and combines them with vortex's
  const reducers = getReducers({
    swapAssetReducer: r.swapAssetReducer,
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initial_state,
    composer(applyMiddleware(sagaMiddleware)),
  );

  // Recover the vortex sagas. This method takes your custom sagas and combines them with vortex's
  const sagas = getSagas(store, [
    // watchIndexTokenBuyProcess,
    // watchIndexTokenSellProcess,
    // watchStartBuyIndexTokens,
  ]);

  sagaMiddleware.run(sagas);

  return store;
};
