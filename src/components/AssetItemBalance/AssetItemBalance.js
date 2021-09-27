import React from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const USD_SYMBOL = '$';

const AssetItemBalance = ({
  symbol,
  balance,
  price,
  nativeCurrencySymbol,
  stablePrice,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.block}>
        <Typography className={classes.text}>Index in wallet:</Typography>
        <AppAssetAmount
          classes={{ root: classes.value}}
          amount={balance}
          symbol={symbol}
          precision={6}
        />
      </Box>

      <Divider className={classes.divider}/>

      <Box className={classes.blockPrice}>
        <Box className={classes.price}>
          <Typography className={classes.text}>Index price:</Typography>
          <AppAssetAmount
            classes={{ root: classes.value}}
            amount={price}
            symbol={nativeCurrencySymbol}
            precision={6}
          />
        </Box>
        <Box className={classes.price}>
          <AppAssetAmount
            classes={{ root: classes.value}}
            amount={stablePrice}
            symbol={USD_SYMBOL}
            precision={2}
            withParentheses
          />
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state, { address }) => ({
  balance: s.selectAssetBalanceByAddress(state, address),
  symbol: s.selectAssetSymbolByAddress(state, address),
  price: s.selectFromWei(state, s.selectAssetPriceForAmountByAddress(state, address)),
  nativeCurrencySymbol: s.selectNativeCurrencySymbol(state),
  stablePrice: s.selectAssetStablePriceByAddress(state, address),
});

export default connect(mapStateToProps)(AssetItemBalance);
