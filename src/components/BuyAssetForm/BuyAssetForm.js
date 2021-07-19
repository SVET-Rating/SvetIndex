import React from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import formBuyIndexTokens from '../../ethvtx_config/actions/buyIndexTokensAction';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";
import SlippageTolerance from '../SlippageTolerance/SlippageTolerance';
import TransactionDelay from '../TransactionDelay/TransactionDelay';
import SwapInAssetBalance from '../SwapInAssetBalance/SwapInAssetBalance';
import SwapOutAssetBalance from '../SwapOutAssetBalance/SwapOutAssetBalance';
import ChangeSwapAssetsIcon from '../icons/ChangeSwapAssetsIcon/ChangeSwapAssetsIcon';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import useStyles from './styles';

const BuyAssetForm = ({
  buyAsset, resetToInvestment,
  ITokContract, ITAmount, ITAddress, currentAddress, svetToken,
}) => {
  const classes = useStyles();

  const handleClickCancel = (e) => {
    resetToInvestment(e);
  };

  const handleClickBuy = () => {
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
      </Box>

      <TransactionDetails />

      <Box className={classes.actionSection}>
        <Button
          className={classes.button}
          onClick={handleClickCancel}
        >Cancel</Button>

        <Button
          className={classes.button}
          onClick={handleClickBuy}
        >Buy</Button>
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
});

const mapDispatchToProps = (dispatch) => ({
  resetToInvestment: (e) => dispatch(resetAction(e)),
  buyAsset: (ITokContract, ITAmount, ITAddress, currentAddress, svetToken) => (
    dispatch(formBuyIndexTokens(ITokContract, ITAmount, ITAddress, currentAddress, svetToken))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyAssetForm);
