import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import { SETTINGS } from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import useStyles from './styles';

const INPUT_ID = 'TransactionDelayId';

const TransactionDelay = ({ delay, setDelay }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === ''
      || value === '0'
      || !Number.isNaN(Number(value))
      || Number.isInteger(Number(value))) {
      setDelay((value === '' || value === '0') ? value : Number.parseInt(value));
    }
  };

  const handleBlur = (e) => {
    const { value } = e.target;

    if (Number.isNaN(Number(value))
      || !Number.isInteger(Number(value))
      || value < SETTINGS.minDelay
      || value > SETTINGS.maxDelay) {
      setDelay(value < SETTINGS.minDelay ? SETTINGS.minDelay : SETTINGS.maxDelay);
    }
  };

  return (
    <Box className={classes.root}>
      <label
        className={classes.label}
        htmlFor={INPUT_ID}
      >
        Transaction deadline?
      </label>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          value={delay}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        &nbsp;minutes
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  delay: s.selectDelay(state),
});

const mapDispatchToProps = (dispatch) => ({
  setDelay: (value) => dispatch(a.setDelay(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDelay);
