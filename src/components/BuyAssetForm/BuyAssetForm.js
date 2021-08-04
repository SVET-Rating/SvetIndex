import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
// import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
// import formBuyIndexTokens from '../../ethvtx_config/actions/buyIndexTokensAction';
import { cancelSwap } from '../../ethvtx_config/actions/actions';
import SlippageTolerance from '../SlippageTolerance/SlippageTolerance';
import TransactionDelay from '../TransactionDelay/TransactionDelay';
import SwapInAssetBalance from '../SwapInAssetBalance/SwapInAssetBalance';
import SwapOutAssetBalance from '../SwapOutAssetBalance/SwapOutAssetBalance';
import ChangeSwapAssetsIcon from '../icons/ChangeSwapAssetsIcon/ChangeSwapAssetsIcon';
import AssetsCostCompare from '../AssetsCostCompare/AssetsCostCompare';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import AppButton from '../AppButton/AppButton';
import useStyles from './styles';

const BuyAssetForm = ({
  cancelSwap,
  swapInAmount, swapOutAmount, swapOutBalance,
}) => {
  const classes = useStyles();

  const handleClickCancel = () => {
    cancelSwap();
  };

  const handleClickBuy = () => {
    console.log('--- click buy button ---')
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
          onClick={handleClickBuy}
          disabled={!Number(swapInAmount) || swapOutAmount > swapOutBalance}
        >Buy</AppButton>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  // ITokContract: getContract(state, 'IndexSwap', '@indexswap'),
  // ITAmount: state.buyTokensReducer.indexTokensAmount,
  // ITAddress: state.indexTokenReducer.activeToken.tokenAddress,
  // currentAddress: state.vtxconfig.coinbase,
  // svetToken: getContract(state, 'ERC20', '@svettoken'),
  swapInAmount: state.swapAssetReducer.swapInAmount,
  swapOutAmount: state.swapAssetReducer.swapOutAmount,
  swapOutBalance: '1.236587458962875632',
});

const mapDispatchToProps = (dispatch) => ({
  cancelSwap: () => dispatch(cancelSwap()),
  // buyAsset: (ITokContract, ITAmount, ITAddress, currentAddress, svetToken) => (
  //   dispatch(formBuyIndexTokens(ITokContract, ITAmount, ITAddress, currentAddress, svetToken))
  // ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyAssetForm);
