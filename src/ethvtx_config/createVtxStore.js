import { applyMiddleware, compose, createStore } from 'redux';
import { getSagas, getReducers, getInitialState, configureVtx } from 'ethvtx';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'
import indexTokenReducer from './reducers/indexTokenReducer';
import indexTokenTokens from './reducers/getTokenTokens';
import buyTokensReducer from './reducers/buyTokensReducer';
import sellIndexTokenReducer from './reducers/sellTokensReducer';

export const createVtxStore = () => {

    const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // You can configure some parameters here to inject them with the initial state
    const initial_state = configureVtx(getInitialState(), {
        poll_timer: 100,
        confirmation_treshold: 3
    });

    const additionReducers  = {
        indexTokenReducer,
        indexTokenTokens,
        sellIndexTokenReducer,
        buyTokensReducer
    }

    // Recover the vortex reducers. This method takes your custom reducers and combines them with vortex's
    const reducers = getReducers(additionReducers);

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        initial_state,
        composer(applyMiddleware(sagaMiddleware,thunk))
    );

    // Recover the vortex sagas. This method takes your custom sagas and combines them with vortex's
    const sagas = getSagas(store);

    sagaMiddleware.run(sagas);

    return store;

};
