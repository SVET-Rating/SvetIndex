import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { selectAssetTokenShare } from '../../ethvtx_config/selectors/selectors';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon'
import useStyles from './styles';

const AssetItemTokensShare = ({ token, share }) => {
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

      <Typography className={classes.text}>
        {share}%
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state, { token }) => ({
  share: selectAssetTokenShare(state, token),
});

export default connect(mapStateToProps)(AssetItemTokensShare);
