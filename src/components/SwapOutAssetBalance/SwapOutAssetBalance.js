import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const SwapOutAssetBalance = ({
  symbol, balance, swapAmount, mode,
  token
  // setSwapAmount,
}) => {
  const classes = useStyles();

  console.log('token ---', token)

  const handleMaxButton = () => {
    console.log('click max button ---')
    // if (balance) {
    //   setSwapAmount(balance);
    // }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <Typography className={classes.label}>
          {symbol}
        </Typography>
        <AppAssetAmount amount={swapAmount || '0.0'} />
      </Box>

      <Box className={classes.balance}>
        <Typography>Balance:</Typography>
        <AppAssetAmount
          amount={balance || '0.0'}
          precision={8}
        />
        {mode === SWAP_MODE.buy && <AppButtonInline
          className={classes.maxButton}
          onClick={handleMaxButton}
          disabled={!Number(balance)}
        >
          (max)
        </AppButtonInline>}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  symbol: 'WETH',
  balance: s.selectSwapOutAssetAmount(state),
  swapAmount: '0.632569854',
  mode: s.selectSwapMode(state),
  // token: s.selectSwapOutAsset(state),
});

const mapDispatchToProps = (dispatch) => ({
  // setSwapAmount: (value) => dispatch(a.setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
