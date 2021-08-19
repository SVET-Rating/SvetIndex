import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    backgroundColor: '#f7041fd6',
    border: '1px solid',
    minWidth: '7rem',
    '&:hover': {
        backgroundColor: '#9a8f11b0',
        color: '#FFF'
      }
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

const TransactionFailModal = (props) => {
  const classes = useStyles();
  let open = false;

  if (props.hasError) {
    open = true;
  }

  return (
    <div className={classes.root}>
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
            <h2 id="transition-modal-title">TRANSACTION ABORTED</h2>
            <p id="transition-modal-description">({props.hasError})</p>
            <Button variant="outlined" className={classes.button}
              onClick={(e) => props.resetToInvestment(e)}
            >GO BACK</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    hasError: state.buyTokensReducer.hasError || state.sellIndexTokenReducer.hasError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetToInvestment: (e) => dispatch(resetAction(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFailModal);
