import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@material-ui/core';
import useStyles from './styles';

const AppStepper = ({ steps = {}, activeStep = -1, className }) => {
  const classes = useStyles();

  const stepperSteps = steps.map(({ label }) => (
    <Step key={label} className={classes.step}>
      <StepLabel className={classes.label}>{label}</StepLabel>
    </Step>
  ));

  return (
    <Box className={`${classes.root} ${className}`}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
      >
        {stepperSteps}
      </Stepper>
    </Box>
  );
}

export default AppStepper;
