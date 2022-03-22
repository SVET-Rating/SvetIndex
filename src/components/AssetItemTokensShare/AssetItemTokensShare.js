import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensShare = ({ token }) => {
  const classes = useStyles();

  if (!token) {
    return null;
  }

  const { symbol, addrActive, share } = token;

  return (
    <Box className={classes.root}>
      <AppTokenAddressIdenticon
        className={classes.icon}
        address={addrActive}
        size="2rem"
      />

      <Typography className={classes.text}>
        {symbol}
      </Typography>

      <AppAssetAmount
        classes={{
          root: classes.amountValue,
          symbol: classes.amountSymbol,
        }}
        amount={(share * 100).toFixed(2)}
        symbol={'%'}
      />
    </Box>
  );
};

export default AssetItemTokensShare;
