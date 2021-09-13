import React from 'react';
import { Box, Stepper, Step, StepLabel, Tooltip } from '@material-ui/core';
import useStyles from './styles';

const AppStepper = ({
  steps = [],
  activeStep = -1,
  disabled = false,
  className,
}) => {
  const classes = useStyles();

  const stepperSteps = steps.map(({ label }) => (
    <Step key={label} className={classes.step}>
      <Tooltip
        classes={{ popper: classes.tooltip }}
        disableFocusListener
        title={label}
      >
        <StepLabel className={classes.stepLabel} />
      </Tooltip>
    </Step>
  ));

  return disabled ? null : (
    <Box className={`${classes.root} ${className}`}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        // alternativeLabel
      >
        {stepperSteps}
      </Stepper>
    </Box>
  );
}

export default AppStepper;
