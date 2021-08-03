import React from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/getters';
import { Box, Button, Typography } from '@material-ui/core';
import { setSwapInAmount } from '../../ethvtx_config/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers';
import { isNumber } from '../../helpers';
import AppInput from '../AppInput/AppInput';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  assetSymbol, balance, swapAmount, setSwapAmount, mode,
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
      <Typography className={classes.amount}>
        <label
          className={classes.label}
          htmlFor={ID}
        >
          {assetSymbol}
        </label>

        <AppInput
          className={classes.input}
          id={ID}
          value={swapAmount}
          onChange={handleChange}
        />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <AssetAmount amount={balance || '0.0'} precision={8} />
        &nbsp;
        {mode === SWAP_MODE.sell && <Button
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

const getBalance = (state) => {
  const address = state.swapAssetReducer.asset;
  if (!address) {
    return;
  }
  return getContract(state, 'IndexToken', address).fn.balanceOf(address);
};

const getSymbol = (state) => {
  const address = state.swapAssetReducer.asset;
  if (!address) {
    return;
  }
  return getContract(state, 'IndexToken', address).fn.balanceOf(address);
};

const mapStateToProps = (state) => ({
  assetSymbol: getSymbol(state),
  balance: getBalance(state),
  swapAmount: state.swapAssetReducer.swapInAmount,
  mode: state.swapAssetReducer.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
