import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as selectors from '../../ethvtx_config/selectors/selectors';
// import { setSwapInAmount } from '../../ethvtx_config/actions/actions';
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

  console.log(token)

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
  balance: '1.236587458962875632',
  token: state.swapAssetReducer.assetOut,
  // token: selectors.selectSwapOutAsset(state),
  swapAmount: '0.632569854',
  mode: state.swapAssetReducer.mode,
  // mode: selectors.selectSwapMode(state),
});

const mapDispatchToProps = (dispatch) => ({
  // setSwapAmount: (value) => dispatch(setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
