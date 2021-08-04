import React from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/getters';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';

const ASSET_IN_AMOUNT = '1';

const AssetsCostCompare = ({ assetInSymbol, assetOutSymbol, assetOutAmount }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.costCompare}>
        {ASSET_IN_AMOUNT}&nbsp;
        <span className={classes.symbol}>{assetInSymbol}</span>
        &nbsp;=&nbsp;{assetOutAmount}&nbsp;
        <span className={classes.symbol}>{assetOutSymbol}</span>
      </Typography>
    </Box>
  );
};

const getSymbol = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (!address) {
    return;
  }

  return getContract(state, 'IndexToken', address).fn.symbol();
};

const mapStateToProps = (state) => ({
  assetInSymbol: getSymbol(state),
  assetOutSymbol: 'ETH',
  assetOutAmount: '0.01256',
});

export default connect(mapStateToProps)(AssetsCostCompare);
