import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { setSlippage } from '../../ethvtx_config/actions/buyIndexTokensAction';
import Input from '../Input/Input';
import useStyles from './styles';

const INPUT_ID = 'SlippageToleranceId';

const SlippageTolerance = ({ slippage, setSlippage }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || !Number.isInteger(Number(value)) || value < 1 || value > 25) {
      return;
    }
    setSlippage(Number.parseInt(value) || 1);
  };

  return (
    <Box className={classes.root}>
      <label
        className={classes.label}
        htmlFor={INPUT_ID}
      >Slippage tolerance?</label>

      <Typography>
        <Input
          className={classes.input}
          id={INPUT_ID}
          value={slippage}
          onChange={handleChange}
        />
        &nbsp;%
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  slippage: state.buyTokensReducer.slippage,
});

const mapDispatchToProps = (dispatch) => ({
  setSlippage: (value) => dispatch(setSlippage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlippageTolerance);
