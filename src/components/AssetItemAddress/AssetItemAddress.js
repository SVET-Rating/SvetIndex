import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import useStyles from './styles';

const ETHERSCAN_ADDRESS_URL = 'https://etherscan.io/address';

const AssetItemAddress = ({ address }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppEtherAddress address={address} />

      <Typography className={classes.text}>
        <span>go to</span>
        <a className={classes.link}
          href={`${ETHERSCAN_ADDRESS_URL}/${address}`}
          target="_blank"
        >explorer</a>
      </Typography>
    </Box>
  );
}

export default AssetItemAddress;
