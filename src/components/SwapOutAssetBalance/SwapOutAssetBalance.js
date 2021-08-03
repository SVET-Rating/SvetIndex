import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';
import { setSwapOutAmount } from '../../ethvtx_config/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const SwapOutAssetBalance = ({
  assetSymbol, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

  const handleMaxButton = () => {
    if (balance) {
      setSwapAmount(balance);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.amount}>
        <Typography className={classes.label}>
          {assetSymbol}
        </Typography>
        <AppAssetAmount amount={swapAmount || '0.0'} />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <AppAssetAmount amount={balance || '0.0'} precision={8} />
        &nbsp;
        {mode === SWAP_MODE.buy && <Button
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
  assetSymbol: 'ETH',
  balance: '1.236587458962875632',
  swapAmount: state.swapAssetReducer.swapOutAmount,
  mode: state.swapAssetReducer.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapOutAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
