import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
//import store from './redux/store'
import { createVtxStore } from '../ethvtx_config/createVtxStore';
import { setupWeb3 } from '../ethvtx_config/setupWeb3';
import * as serviceWorker from './serviceWorker';


const main = async () => {

  const store = createVtxStore();
  await setupWeb3(store);
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

};

main();

