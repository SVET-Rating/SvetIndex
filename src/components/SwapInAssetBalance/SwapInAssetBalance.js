import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';
import { setSwapAmount } from '../../ethvtx_config/actions/buyIndexTokensAction';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  balance, swapAmount, setSwapAmount, isReadonly = false,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || value < 0 /*|| value > balance*/) {
      return;
    }
    setSwapAmount(value);
  };

  const handleMaxButton = () => {
    if (balance) {
      setSwapAmount(balance);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.amount}>
        <label
          className={classes.label}
          htmlFor={ID}
        >ETH</label>

        <input
          className={classes.input}
          id={ID}
          value={swapAmount}
          readOnly={isReadonly}
          onChange={handleChange}
        />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <span>{balance ? balance : '0.0'}</span>
        &nbsp;
        <Button
          className={classes.maxButton}
          onClick={handleMaxButton}
          disabled={!balance}
        >(max)</Button>
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  balance: state.buyTokensReducer.etherAmount,
  swapAmount: state.buyTokensReducer.swapAmount,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
