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

  if (!steps.length || disabled) {
    return null;
  }

  const stepperSteps = steps.map(({ step, label }) => (
    <Step key={step} className={classes.step}>
      <Tooltip
        classes={{ popper: classes.tooltip }}
        title={label}
      >
        <StepLabel className={classes.stepLabel}>
          {label}
        </StepLabel>
      </Tooltip>
    </Step>
  ));

  return (
    <Box className={`${classes.root} ${className}`}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        alternativeLabel
      >
        {stepperSteps}
      </Stepper>
    </Box>
  );
}

export default AppStepper;
