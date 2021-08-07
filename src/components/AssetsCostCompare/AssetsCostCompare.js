import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { selectAssetInSymbol } from '../../ethvtx_config/selectors/selectors';
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

const mapStateToProps = (state) => ({
  assetInSymbol: selectAssetInSymbol(state),
  assetOutSymbol: 'ETH',
  assetOutAmount: '0.01256',
});

export default connect(mapStateToProps)(AssetsCostCompare);
