import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import { SETTINGS } from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import useStyles from './styles';

const INPUT_ID = 'SlippageToleranceId';

const SlippageTolerance = ({ slippage, setSlippage }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === ''
      || value === '0'
      || !Number.isNaN(Number(value))
      || Number.isInteger(Number(value))) {
        setSlippage((value === '' || value === '0') ? value : Number.parseInt(value));
    }
  };

  const handleBlur = (e) => {
    const { value } = e.target;

    if (Number.isNaN(Number(value))
      || !Number.isInteger(Number(value))
      || value < SETTINGS.minDelay
      || value > SETTINGS.maxDelay) {
        setSlippage(value < SETTINGS.minSlippage ? SETTINGS.minSlippage : SETTINGS.maxSlippage);
    }
  };

  return (
    <Box className={classes.root}>
      <label
        className={classes.label}
        htmlFor={INPUT_ID}
      >
        Slippage tolerance?
      </label>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          value={slippage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        &nbsp;%
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  slippage: s.selectSlippage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSlippage: (value) => dispatch(a.setSlippage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlippageTolerance);
