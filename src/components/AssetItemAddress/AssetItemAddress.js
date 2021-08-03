import React from 'react';
import { Box, Typography } from '@material-ui/core';
import EtherAddress from '../EtherAddress/EtherAddress';
import useStyles from './styles';

const ETHERSCAN_ADDRESS_URL = 'https://etherscan.io/address';

const AssetItemAddress = ({ address }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <EtherAddress address={address} />

      <Typography className={classes.text}>
        <span>go to</span>
        &nbsp;
        <a className={classes.link}
          href={`${ETHERSCAN_ADDRESS_URL}/${address}`}
          target="_blank"
        >explorer</a>
      </Typography>
    </Box>
  );
}

export default AssetItemAddress;
