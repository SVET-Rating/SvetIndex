import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import formBuyIndexTokens from '../../ethvtx_config/actions/buyIndexTokensAction';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";
import { setSwapAmount } from '../../ethvtx_config/actions/buyIndexTokensAction';
import SlippageTolerance from '../SlippageTolerance/SlippageTolerance';
import TransactionDelay from '../TransactionDelay/TransactionDelay';
import SwapInAssetBalance from '../SwapInAssetBalance/SwapInAssetBalance';
import SwapOutAssetBalance from '../SwapOutAssetBalance/SwapOutAssetBalance';
import ChangeSwapAssetsIcon from '../icons/ChangeSwapAssetsIcon/ChangeSwapAssetsIcon';
import AssetsCostCompare from '../AssetsCostCompare/AssetsCostCompare';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import Button from '../Button/Button';
import useStyles from './styles';

const SellAssetForm = ({
  buyAsset, resetToInvestment,
  ITokContract, ITAmount, ITAddress, currentAddress, svetToken,
  setSwapAmount, swapInAmount, swapOutAmount, swapOutBalance,
}) => {
  const classes = useStyles();

  const handleClickCancel = (e) => {
    setSwapAmount(0);
    resetToInvestment(e);
  };

  const handleClickSell = () => {
    buyAsset(ITokContract, ITAmount, ITAddress, currentAddress, svetToken);
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
        <Button
          className={classes.button}
          onClick={handleClickCancel}
        >Cancel</Button>

        <Button
          className={classes.button}
          onClick={handleClickSell}
          disabled={!Number(swapInAmount) || swapOutAmount > swapOutBalance}
        >Sell</Button>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  ITokContract: getContract(state, 'IndexSwap', '@indexswap'),
  ITAmount: state.buyTokensReducer.indexTokensAmount,
  ITAddress: state.indexTokenReducer.activeToken.tokenAddress,
  currentAddress: state.vtxconfig.coinbase,
  svetToken: getContract(state, 'ERC20', '@svettoken'),
  swapInAmount: state.buyTokensReducer.swapAmount,
  swapOutAmount: state.buyTokensReducer.swapOutAmount,
  swapOutBalance: state.buyTokensReducer.etherAmount,
});

const mapDispatchToProps = (dispatch) => ({
  resetToInvestment: (e) => dispatch(resetAction(e)),
  buyAsset: (ITokContract, ITAmount, ITAddress, currentAddress, svetToken) => (
    dispatch(formBuyIndexTokens(ITokContract, ITAmount, ITAddress, currentAddress, svetToken))
  ),
  setSwapAmount: (value) => dispatch(setSwapAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellAssetForm);
