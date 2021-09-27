import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const ASSET_IN_AMOUNT = '1';
const EQUAL_SYMBOL = '=';

const AssetsCostCompare = ({
  assetInSymbol,
  assetOutSymbol,
  assetOutAmount,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppAssetAmount
        classes={{ root: classes.compareAmount}}
        amount={ASSET_IN_AMOUNT}
        symbol={assetInSymbol}
      />

      {EQUAL_SYMBOL}

      <AppAssetAmount
        classes={{ root: classes.compareAmount}}
        amount={assetOutAmount}
        symbol={assetOutSymbol}
        precision={assetOutAmount ? 8 : 0}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  assetOutSymbol: s.selectNativeCurrencySymbol(state),
  assetInSymbol: s.selectAssetInSymbol(state),
  assetOutAmount: s.selectOneAmountAssetPrice(state),
});

export default connect(mapStateToProps)(AssetsCostCompare);
