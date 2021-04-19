import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Start Approve Tokens', 'End Approve', 'Start Buy Index', 'End Buying'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Approving for SVET';
    case 1:
      return 'Svet tokens Approved';
    case 2:
      return 'Start process of buying INDEX TOKENS';
    case 3:
      return 'End process of bu'
    default:
      return 'Unknown step';
  }
}

const buyIndexTokensSteps = (props) => {
  const classes = useStyles();
  var activeStep;
  const steps = getSteps();

  if (props.start_aprove) {
      activeStep = 0;
  }

  if (props.end_buyindex) {
    activeStep = 1;
  }

  if (props.start_buyindex) {
    activeStep = 2;
  }

  if (props.end_buyindex) {
    activeStep = 3;
  }

  if (props.buyindex_end) {
    activeStep = 0;
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
        //   }
        //   if (isStepSkipped(index)) {
        //     stepProps.completed = false;
        //   }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

const getEventSvetToken = (state) => {
    const contract = getContract(state, 'ERC20', '@svettoken')
    const events = contract.events.Approval()
    return events
}


const mapStateToProps = (state) => {
    return {
        svetTokenAprovalEvent: getEventSvetToken(state),
        start_aprove: state.buyTokensReducer.start_aprove,
        end_aprove: state.buyTokensReducer.end_aprove,
        start_buyindex: state.buyTokensReducer.start_buyindex,
        end_buyindex: state.buyTokensReducer.end_buyindex,
        buyindex_end: state.buyTokensReducer.buyindex_end
    }
}

export default connect(mapStateToProps, null)(buyIndexTokensSteps);