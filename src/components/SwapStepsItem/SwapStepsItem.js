import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import AppStepper from '../AppStepper/AppStepper';
import useStyles from './styles';

const SwapStepsItem = ({
  swapMode,
  processState,
}) => {
  const classes = useStyles();

  const steps = (swapMode === c.SWAP_MODE.buy)
    ? c.BUY_STEPS
    : c.SELL_STEPS;

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
});

export default connect(mapStateToProps)(SwapStepsItem);
