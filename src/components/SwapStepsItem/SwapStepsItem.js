import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import { BUY_STEPS, SELL_STEPS } from './steps-config';
import AppStepper from '../AppStepper/AppStepper';
import useStyles from './styles';

const SwapStepsItem = ({
  swapMode,
  processState,
  symbol,
  amount,
}) => {
  const classes = useStyles();

  const steps = ((swapMode === c.SWAP_MODE.buy) ? BUY_STEPS : SELL_STEPS)
    .map(({ step, label }) => ({
      step,
      label: typeof label === 'function' ? label(amount, symbol) : label,
    }));

  const isDisabled = !swapMode;

  let activeStep = 0;
  steps.forEach(({ step }, idx) => {
    if (processState === step) {
      activeStep = idx;
    }
  });

  return isDisabled ? null : (
    <Box className={classes.root}>
      <AppStepper steps={steps} activeStep={activeStep} />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  swapMode: s.selectSwapMode(state),
  processState: s.selectSwapProcessState(state),
  symbol: s.selectAssetInSymbol(state),
  amount: s.selectSwapInAmount(state),
});

export default connect(mapStateToProps)(SwapStepsItem);
