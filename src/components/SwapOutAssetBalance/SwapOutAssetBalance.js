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
  balance,
  swapAmount,
  mode,
  currencySymbol,
  // token, info
  // setSwapAmount,
}) => {
  const classes = useStyles();

  const handleMaxButton = () => {
    // if (balance) {
    //   setSwapAmount(balance);
    // }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <Typography className={classes.label}>
          {currencySymbol}
        </Typography>
        <AppAssetAmount
          amount={swapAmount}
          precision={Number(swapAmount) && 12}
        />
      </Box>

      <Box className={classes.balance}>
        <Typography>
          Balance:
        </Typography>
        <AppAssetAmount
          classes={{ root: classes.balanceAmount}}
          amount={balance}
          precision={Number(balance) && 8}
        />
        {mode === SWAP_MODE.buy && (
          <AppButtonInline
            className={classes.maxButton}
            onClick={handleMaxButton}
            // disabled={!Number(balance)}
            disabled={true}
          >
            (max)
          </AppButtonInline>)
        }
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  balance: s.selectSwapOutAssetBalance(state),
  swapAmount: s.selectSwapOutAssetAmount(state),
  mode: s.selectSwapMode(state),
  currencySymbol: s.selectNativeCurrencySymbol(state),
  // info: s.selectOraclePriceContract(state).fn.getAllActsIndPrices(s.selectAssetInAddress(state)),
  // token: s.selectSwapOutAsset(state),
});

const mapDispatchToProps = (dispatch) => ({
  // setSwapAmount: (value) => dispatch(a.setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
