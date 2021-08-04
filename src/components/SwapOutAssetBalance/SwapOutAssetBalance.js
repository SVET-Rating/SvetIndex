import React from 'react';
import { connect } from 'react-redux';
import { getWeb3, getContract } from 'ethvtx/lib/getters';
import { Box, Typography } from '@material-ui/core';
import { setSwapInAmount } from '../../ethvtx_config/actions/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const SwapOutAssetBalance = ({
  symbol, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

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

// const getSymbol = (state) => {
//   const address = state.swapAssetReducer.assetOut;
//   if (!address) {
//     return;
//   }
//   console.log(state)
//   return getContract(state, 'IndexToken', address).fn.symbol();
// };

const mapStateToProps = (state) => ({
  symbol: 'WETH',
  // symbol: getSymbol(state),
  balance: '1.236587458962875632',
  swapAmount: state.swapAssetReducer.swapOutAmount,
  mode: state.swapAssetReducer.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
