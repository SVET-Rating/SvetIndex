import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import SlippageTolerance from '../SlippageTolerance/SlippageTolerance';
import TransactionDelay from '../TransactionDelay/TransactionDelay';
import SwapInAssetBalance from '../SwapInAssetBalance/SwapInAssetBalance';
import SwapOutAssetBalance from '../SwapOutAssetBalance/SwapOutAssetBalance';
import ChangeSwapAssetsIcon from '../icons/ChangeSwapAssetsIcon/ChangeSwapAssetsIcon';
import AssetsCostCompare from '../AssetsCostCompare/AssetsCostCompare';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import AppButton from '../AppButton/AppButton';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import OrbitLoader from '../loaders/OrbitLoader/OrbitLoader';
import useStyles from './styles';

const SwapAssetForm = ({
  swapMode,
  cancelSwap, startSwap, changeSwapMode,
  swapInAmount, swapInBalance,
  swapOutAmount, swapOutBalance,
  processState,
}) => {
  const classes = useStyles();

  const handleClickCancel = () => {
    cancelSwap();
  };

  const handleClickSell = () => {
    startSwap();
  };

  const handleChangeSwap = () => {
    const mode = (swapMode === c.SWAP_MODE.buy)
      ? c.SWAP_MODE.sell
      : c.SWAP_MODE.buy;

    changeSwapMode(mode);
  };

  const action = (swapMode === c.SWAP_MODE.buy) ? 'buy' : 'sell';

  const isSwapDisabled = (swapMode === c.SWAP_MODE.buy)
    ? !Number(swapInAmount) || Number(swapOutAmount) > Number(swapOutBalance)
    : !Number(swapInAmount) || Number(swapInAmount) > Number(swapInBalance);

  const isActionsDisabled = !!processState;

    return (
    <Box className={`${classes.root} ${isActionsDisabled && classes.actionsDisabled}`}>
      <SlippageTolerance />
      <TransactionDelay />

      <Box className={classes.swapBlock}>
        <SwapInAssetBalance />

        <AppButtonInline
          className={classes.swapIcon}
          onClick={handleChangeSwap}
          disabled={isActionsDisabled}
        >
          <ChangeSwapAssetsIcon />
        </AppButtonInline>

        <SwapOutAssetBalance />

        <AssetsCostCompare />
      </Box>

      <TransactionDetails />

      <Box className={classes.actionSection}>
        <AppButton
          className={classes.button}
          onClick={handleClickCancel}
          disabled={isActionsDisabled}
        >
          Cancel
        </AppButton>

        <AppButton
          className={classes.button}
          onClick={handleClickSell}
          disabled={isSwapDisabled || isActionsDisabled}
        >
          {action}
          <OrbitLoader className={classes.loader} loading={processState} />
        </AppButton>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  swapMode: s.selectSwapMode(state),
  swapInAmount: s.selectSwapInAmount(state),
  swapInBalance: s.selectAssetInBalance(state),
  swapOutAmount: s.selectSwapOutAssetAmount(state),
  swapOutBalance: s.selectSwapOutAssetBalance(state),
  processState: s.selectSwapProcessState(state),
});

const mapDispatchToProps = (dispatch) => ({
  cancelSwap: () => dispatch(a.cancelSwap()),
  startSwap: () => dispatch(a.setSwapStart()),
  changeSwapMode: (mode) => dispatch(a.setSwapMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapAssetForm);
