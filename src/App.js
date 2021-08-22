import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as a from './ethvtx_config/actions/actions';
import TheHeader from './components/TheHeader/TheHeader';
import TheFooter from './components/TheFooter/TheFooter';
import TheRouter from './components/TheRouter/TheRouter';
import useStyles from './styles';

const App = ({ initialize }) => {
  useEffect(() => {
    initialize();
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.root} >
      <TheHeader />
      <Box component='main' className={classes.main}>
        <Router>
          <TheRouter />
        </Router>
      </Box>
      <TheFooter />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  initialize: () => dispatch(a.setInitialData()),
});

export default connect(null, mapDispatchToProps)(App);
