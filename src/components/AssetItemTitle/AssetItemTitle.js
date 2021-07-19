import React from 'react';
import { Box, Typography } from '@material-ui/core';
import TokenAddressIdenticon from '../TokenAddressIdenticon/TokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTitle = ({ asset = {} }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TokenAddressIdenticon
        className={classes.icon}
        address={asset.addr}
        size="2rem"
      />

      <Typography className={classes.text} variant="h3">
        {asset.name}
      </Typography>
    </Box>
  );
}

export default AssetItemTitle;
