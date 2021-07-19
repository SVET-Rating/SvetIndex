import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { selectSwapInAmount } from '../../ethvtx_config/selectors/selectors';
import { cancelSwap, setStartSwap } from '../../ethvtx_config/actions/actions';
import SlippageTolerance from '../SlippageTolerance/SlippageTolerance';
import TransactionDelay from '../TransactionDelay/TransactionDelay';
import SwapInAssetBalance from '../SwapInAssetBalance/SwapInAssetBalance';
import SwapOutAssetBalance from '../SwapOutAssetBalance/SwapOutAssetBalance';
import ChangeSwapAssetsIcon from '../icons/ChangeSwapAssetsIcon/ChangeSwapAssetsIcon';
import AssetsCostCompare from '../AssetsCostCompare/AssetsCostCompare';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import AppButton from '../AppButton/AppButton';
import useStyles from './styles';

const SellAssetForm = ({
  cancelSwap, startSwap,
  swapInAmount, swapOutAmount, swapOutBalance,
}) => {
  const classes = useStyles();

  const handleClickCancel = (e) => {
    cancelSwap();
  };

  const handleClickSell = () => {
    // startSwap();
  };

  return (
    <Box className={classes.root}>
      <SlippageTolerance />
      <TransactionDelay />

      <Box className={classes.swapBlock}>
        <SwapInAssetBalance />
        <Box className={classes.swapIcon}>
          <ChangeSwapAssetsIcon />
        </Box>
        <SwapOutAssetBalance />
        <AssetsCostCompare />
      </Box>

      <TransactionDetails />

      <Box className={classes.actionSection}>
        <AppButton
          className={classes.button}
          onClick={handleClickCancel}
        >Cancel</AppButton>

        <AppButton
          className={classes.button}
          onClick={handleClickSell}
          disabled={!Number(swapInAmount) || swapOutAmount > swapOutBalance}
        >Sell</AppButton>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  swapInAmount: selectSwapInAmount(state),
  swapOutAmount: '0.632569845236',
  swapOutBalance: '1.236587458962875632',
});

const mapDispatchToProps = (dispatch) => ({
  cancelSwap: () => dispatch(cancelSwap()),
  startSwap: () => dispatch(setStartSwap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellAssetForm);
