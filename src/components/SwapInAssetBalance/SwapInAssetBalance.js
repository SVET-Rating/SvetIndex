import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';
import { setSwapAmount } from '../../ethvtx_config/actions/buyIndexTokensAction';
import Input from '../Input/Input';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  assetName, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || value < 0 /*|| value > balance*/) {
      return;
    }
    setSwapAmount(value);
  };

  const handleAllButton = () => {
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
        >
          {assetName}
        </label>

        <Input
          className={classes.input}
          id={ID}
          value={swapAmount}
          onChange={handleChange}
        />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <span>{balance ? Number(balance).toFixed(8) : '0.0'}</span>
        &nbsp;
        {mode === 'sell' && <Button
          className={classes.maxButton}
          onClick={handleAllButton}
          disabled={!Number(balance)}
        >
          (all)
        </Button>}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  assetName: state.indexTokenReducer.activeToken.indexTokenName,
  balance: state.indexTokenReducer.activeToken.indexTokenBalance,
  swapAmount: state.buyTokensReducer.swapAmount,
  mode: 'sell',
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
