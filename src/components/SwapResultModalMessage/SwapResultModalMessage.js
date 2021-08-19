import React from 'react';
import { connect } from 'react-redux';
import { Box, Modal, Backdrop, Fade, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import { SWAP_STATE } from '../../ethvtx_config/reducers/reducers-constants';
import AppButton from '../AppButton/AppButton';
import useStyles from './styles';

const SUCCESS_MSG = 'Transaction success';
const REJECT_MSG = 'Transaction reject';

const SwapResultModalMessage = ({
  error, resetProcessState, isOpen,
}) => {
  const classes = useStyles();

  const handleButtonClick = () => {
    resetProcessState();
  };

  return (
    <Box className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={isOpen}>
          <Box className={classes.paper}>
            <Typography>
              {error ? REJECT_MSG : SUCCESS_MSG}
            </Typography>

            <AppButton
              className={classes.button}
              onClick={handleButtonClick}
            >
              Go back
            </AppButton>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  error: s.selectSwapProcessError(state),
  isOpen: s.selectSwapProcessState(state) === SWAP_STATE.end,
});

const mapDispatchToProps = (dispatch) => ({
  resetProcessState: () => dispatch(a.resetSwapProcessState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapResultModalMessage);
