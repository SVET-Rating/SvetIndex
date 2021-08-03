import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTitle = ({ asset = {} }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppTokenAddressIdenticon
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
