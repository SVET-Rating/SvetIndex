import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon'
import useStyles from './styles';

const AssetItemTokensShare = ({ token }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppTokenAddressIdenticon
        className={classes.icon}
        address={token.addrActive}
        size="2rem"
      />

      <Typography className={classes.text}>
        {token.symbol}
      </Typography>

      <Typography className={classes.text}>
        {(token.amount / 100).toFixed(2)}%
      </Typography>
    </Box>
  );
}

export default AssetItemTokensShare;
