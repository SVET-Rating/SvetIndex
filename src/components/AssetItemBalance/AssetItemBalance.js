import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import useStyles from './styles';

const AssetItemBalance = ({ balance, price }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.block}>
        <Typography className={classes.text}>Index in wallet:</Typography>
        <Typography className={classes.value}>
          {Number(balance).toFixed(8)}
        </Typography>
      </Box>

      <Divider className={classes.divider}/>

      <Box className={classes.block}>
        <Typography className={classes.text}>Index price:</Typography>
        <Typography className={classes.value}>
          {Number(price).toFixed(8)}&nbsp;ETH
        </Typography>
      </Box>
    </Box>
  );
}

export default AssetItemBalance;
