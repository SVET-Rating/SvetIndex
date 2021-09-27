import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensShare = ({ token, share = 0 }) => {
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

      <AppAssetAmount
        classes={{
          root: classes.amountValue,
          symbol: classes.amountSymbol,
        }}
        amount={(share * 100).toFixed(2)}
        symbol={'%'}
      />
    </Box>
  );
};

const mapStateToProps = (state, { assetAddress, token }) => ({
  share: s.selectTokenShare(state, assetAddress, token.addrActive, token.amount),
});

export default connect(mapStateToProps)(AssetItemTokensShare);
