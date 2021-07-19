import React from 'react';
import { Box, Typography } from '@material-ui/core';
import TokenAddressIdenticon from '../TokenAddressIdenticon/TokenAddressIdenticon'
import useStyles from './styles';

const AssetItemTokensShare = ({ address }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TokenAddressIdenticon
        className={classes.icon}
        address={address.addrActive}
        size="2rem"
      />

      <Typography className={classes.text}>
        {address.symbol}
      </Typography>

      <Typography className={classes.text}>
        {(address.amount / 100).toFixed(2)}%
      </Typography>
    </Box>
  );
}

export default AssetItemTokensShare;
