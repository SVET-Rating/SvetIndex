import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { setInitialData } from './ethvtx_config/actions/actions';
import TheHeader from './components/TheHeader/TheHeader';
import TheFooter from './components/TheFooter/TheFooter';
import TheRouter from './components/TheRouter/TheRouter';

const App = ({ initialize }) => {
  useEffect(() => {
    initialize();
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

const mapDispatchToProps = (dispatch) => ({
  initialize: () => dispatch(setInitialData()),
});

export default connect(null, mapDispatchToProps)(App);
