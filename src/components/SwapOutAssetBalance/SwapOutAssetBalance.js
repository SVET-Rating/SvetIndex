import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';
import { setSwapAmount } from '../../ethvtx_config/actions/buyIndexTokensAction';
import AssetAmount from '../AssetAmount/AssetAmount';
import useStyles from './styles';

const SwapOutAssetBalance = ({
  assetName, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

  const handleMaxButton = (e) => {
    setSwapAmount(balance);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.amount}>
        <Typography className={classes.label}>
          {assetName}
        </Typography>
        <AssetAmount amount={swapAmount} />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <AssetAmount amount={balance} />
        {/* <span>{balance ? Number(balance).toFixed(8) : '0.0'}</span> */}
        &nbsp;
        {mode === 'buy' && <Button
          className={classes.maxButton}
          onClick={handleMaxButton}
          disabled={!Number(balance)}
        >
          (max)
        </Button>}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  assetName: 'ETH',
  balance: state.buyTokensReducer.etherAmount,
  swapAmount: state.buyTokensReducer.swapOutAmount,
  mode: 'sell',
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
