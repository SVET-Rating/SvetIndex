import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: '10px',
    color: 'white',
    backgroundColor: '#119a1199',
    border: '1px solid',
    minWidth: '7rem',
    '&:hover': {
        backgroundColor: '#9a8f11b0',
        color: '#FFF'
      }
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    fontSize: '45px',
    color: '#929191'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
}));

function getSteps() {
  return ['Contract Lanch', 'Confirm contract iteraction', 'Aprove token spend', 'Transaction complited'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'CONFIRM CONTRACT ITERACTION';
    case 1:
      return 'CONFIRMING CONTRACT ITERACTON';
    case 2:
      return 'APROVE YOUR TOKENS SPEND';
    case 3:
      return 'TOKENS SPENDING'
    default:
      return 'TRANSACTION CONFIRMED';
  }
}

const sellIndexTokensSteps = (props) => {
  const classes = useStyles();
  var activeStep = props.buy_index_steps;
  const steps = getSteps();
  var open = false;

  if (activeStep == 4 && !props.hasError) {
    open = true;
  }


  return (
    <div className={classes.root}>

      <Stepper activeStep={props.hasError ? 0 : activeStep}>
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
          {!props.hasError && <div>
            <Typography className={classes.instructions}>
            <marquee behavior="alternate" direction="right">{getStepContent(activeStep)}</marquee>
            </Typography>
          </div>}
      </div>
      <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">TRANSACTION CONFIRMED</h2>
                  <p id="transition-modal-description">
                  <Button variant="outlined" className={classes.button}
                        onClick={(e) => {
                            props.resetToInvestment(e);
                          }}
                        >GO BACK</Button>
                  </p>
                </div>
              </Fade>
            </Modal>
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
        buy_index_steps: state.sellIndexTokenReducer.sell_index_steps,
        hasError: state.sellIndexTokenReducer.hasError
    }
}

const mapDispatchToProps = dispatch => {
  return {
    resetToInvestment: (e) => dispatch(resetAction(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(sellIndexTokensSteps);
