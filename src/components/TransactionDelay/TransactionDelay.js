import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { setDelay } from '../../ethvtx_config/actions/buyIndexTokensAction';
import AppInput from '../AppInput/AppInput';
import useStyles from './styles';

const INPUT_ID = 'TransactionDelayId';

const TransactionDelay = ({ delay, setDelay }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || !Number.isInteger(Number(value)) || value < 1 || value > 25) {
      return;
    }
    setDelay(Number.parseInt(value) || 1);
  };

  return (
    <Box className={classes.root}>
      <label
        className={classes.label}
        htmlFor={INPUT_ID}
      >Transaction deadline?</label>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          value={delay}
          onChange={handleChange}
        />
        &nbsp;minutes
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  delay: state.buyTokensReducer.delay,
});

const mapDispatchToProps = (dispatch) => ({
  setDelay: (value) => dispatch(setDelay(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDelay);
