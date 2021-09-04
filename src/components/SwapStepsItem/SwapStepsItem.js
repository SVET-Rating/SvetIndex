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

  const steps = c.BUY_STEPS
  // const steps = (swapMode === c.SWAP_MODE.buy)
  //   ? c.BUY_STEPS
  //   : c.SELL_STEPS;

  // const isDisabled = !swapMode && !processState;
  const isDisabled = false;

  return isDisabled ? null : (
    <Box className={classes.root}>
      <AppStepper steps={steps} activeStep={1} />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  swapMode: s.selectSwapMode(state),
  processState: s.selectSwapProcessState(state),
});

export default connect(mapStateToProps)(SwapStepsItem);
