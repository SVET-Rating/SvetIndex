import React from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/getters';
import { Box, Typography } from '@material-ui/core';
import { setSwapInAmount } from '../../ethvtx_config/actions/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import { isNumber } from '../../helpers';
import AppInput from '../AppInput/AppInput';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  symbol, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNumber(value) || value < 0) {
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
      <Box className={classes.amount}>
        <label
          className={classes.label}
          htmlFor={ID}
        >
          {symbol}
        </label>

        <AppInput
          className={classes.input}
          id={ID}
          value={swapAmount}
          onChange={handleChange}
        />
      </Box>

      <Box className={classes.balance}>
        <Typography>Balance:</Typography>
        <AppAssetAmount amount={balance || '0.0'} precision={8} />
        {mode === SWAP_MODE.sell && <AppButtonInline
          className={classes.maxButton}
          onClick={handleAllButton}
          disabled={!Number(balance)}
        >
          (all)
        </AppButtonInline>}
      </Box>
    </Box>
  );
};

const getBalance = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (!address) {
    return;
  }
  return getContract(state, 'IndexToken', address).fn.balanceOf(address);
};

const getSymbol = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (!address) {
    return;
  }

  return getContract(state, 'IndexToken', address).fn.symbol();
};

const mapStateToProps = (state) => ({
  symbol: getSymbol(state),
  balance: getBalance(state),
  swapAmount: state.swapAssetReducer.swapInAmount,
  mode: state.swapAssetReducer.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
