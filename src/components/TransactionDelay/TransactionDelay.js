import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const INPUT_ID = 'TransactionDelayId';
const TRANSACTION_DELAY = 'What is transaction deadline?';

const TransactionDelay = ({ delay, setDelay, processState }) => {
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
      || value < c.SETTINGS.minDelay
      || value > c.SETTINGS.maxDelay) {
      setDelay(value < c.SETTINGS.minDelay ? c.SETTINGS.minDelay : c.SETTINGS.maxDelay);
    }
  };

  const isActionsDisabled = processState;

  return (
    <Box className={classes.root}>
      <Typography>
        <label
          className={classes.label}
          htmlFor={INPUT_ID}
        >
          Transaction deadline?
        </label>

        <AppInfoButton
          classes={{ button: classes.infoButton }}
          content={TRANSACTION_DELAY}
        />
      </Typography>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          disabled={isActionsDisabled}
          value={delay}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span>minutes</span>
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  delay: s.selectDelay(state),
  processState: s.selectSwapProcessState(state),
});

const mapDispatchToProps = (dispatch) => ({
  setDelay: (value) => dispatch(a.setDelay(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDelay);
