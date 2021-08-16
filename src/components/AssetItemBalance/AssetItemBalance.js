import React from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const ETHER_SYMBOL = 'ETH';
const WETHER_SYMBOL = 'WETH';
const USD_SYMBOL = '$';

const AssetItemBalance = ({ balance, price }) => {
  const classes = useStyles();
  console.log(price)

  return (
    <Box className={classes.root}>
      <Box className={classes.block}>
        <Typography className={classes.text}>Index in wallet:</Typography>
        <AppAssetAmount
          className={classes.value}
          amount={balance}
          precision={2}
        />
      </Box>

      <Divider className={classes.divider}/>

      <Box className={classes.blockPrice}>
        <Box className={classes.price}>
          <Typography className={classes.text}>Index price:</Typography>
          <AppAssetAmount
            className={classes.value}
            // amount={price}
            amount={'111'}
            symbol={ETHER_SYMBOL}
            precision={6}
          />
        </Box>
        <Box className={classes.price}>
          <AppAssetAmount
            className={classes.value}
            amount={'126.35'}
            symbol={USD_SYMBOL}
            withParentheses
          />
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state, { address }) => ({
  balance: s.selectAssetBalanceByAddress(state, address),
  // price: s.selectAssetPriceByAddress(state, address),
});

export default connect(mapStateToProps)(AssetItemBalance);
