import React from 'react';
import { Box, Typography } from '@material-ui/core';
import EtherAddress from '../EtherAddress/EtherAddress';
import useStyles from './styles';

const AssetItemAddress = ({ address }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <EtherAddress address={address} />

      <Typography className={classes.text}>
        <span>go to</span>
        &nbsp;
        <a className={classes.link}
          href="https://etherscan.io/tokens"
          target="_blank"
        >explorer</a>
      </Typography>
    </Box>
  );
}

export default AssetItemAddress;
