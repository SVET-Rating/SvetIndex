import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const INPUT_ID = 'SlippageToleranceId';
const SLIPPAGE = 'What is slippage tolerance?';

const SlippageTolerance = ({
  slippage,
  setSlippage,
  processState,
  mode,
}) => {
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
      || value < c.SETTINGS.minDelay
      || value > c.SETTINGS.maxDelay) {
        setSlippage(value < c.SETTINGS.minSlippage ? c.SETTINGS.minSlippage : c.SETTINGS.maxSlippage);
    }
  };

  const isSellMode = (mode === c.SWAP_MODE.sell);
  const isActionsDisabled = processState;
  const isComponentDisabled = isSellMode;

  return (
    <Box
      className={`${classes.root} ${isComponentDisabled && classes.rootDisabled}`}
    >
      <Typography>
        <label
          className={classes.label}
          htmlFor={INPUT_ID}
        >
          Slippage tolerance?
        </label>

        <AppInfoButton
          classNameButton={classes.infoButton}
          content={SLIPPAGE}
        />
      </Typography>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          disabled={isActionsDisabled}
          value={isSellMode ? '0' : slippage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span>%</span>
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  slippage: s.selectSlippage(state),
  processState: s.selectSwapProcessState(state),
  mode: s.selectSwapMode(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSlippage: (value) => dispatch(a.setSlippage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlippageTolerance);
