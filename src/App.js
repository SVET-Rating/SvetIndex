import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { getWeb3 } from 'ethvtx/lib/getters';
import { setNetwork } from './ethvtx_config/actions/actions';
import TheHeader from './components/TheHeader/TheHeader';
import TheFooter from './components/TheFooter/TheFooter';
import TheRouter from './components/TheRouter/TheRouter';

const App = ({ web3, setNetworkType }) => {
  useEffect(() => {
    web3.eth.net.getNetworkType()
      .then(setNetworkType)
      .catch();
  }, []);

  return (
    <div className="app" >
      <TheHeader />
      <main className="app-main">
        <Router>
          <TheRouter />
        </Router>
      </main>
      <TheFooter />
    </div>
  );
}

const mapStateToProps = (state) => ({
  web3: getWeb3(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNetworkType: (network) => dispatch(setNetwork(network)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
