import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as a from './ethvtx_config/actions/actions';
import * as s from './ethvtx_config/selectors/selectors';
import TheHeader from './components/TheHeader/TheHeader';
import TheFooter from './components/TheFooter/TheFooter';
import TheRouter from './components/TheRouter/TheRouter';
import { baseName } from './components/TheRouter/paths';
import useStyles from './styles';

const App = ({ isInitialized, initialize }) => {
  useEffect(() => {
    initialize();
    const handleChainChanged = () => { window.location.reload(); }
    window.ethereum.on('chainChanged', handleChainChanged)
    return () => { window.ethereum.removeListener('chainChanged', handleChainChanged) }
  }, []);

  const classes = useStyles();

  if (!isInitialized) {
    return null;
  }

  return (
    <Box className={classes.root} >
      <TheHeader />

      <Box component='main' className={classes.main}>
        <Router basename={baseName}>
          <TheRouter />
        </Router>
      </Box>

      <TheFooter />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isInitialized: s.selectIsInitialized(state),
});

const mapDispatchToProps = (dispatch) => ({
  initialize: () => dispatch(a.getInitialData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
