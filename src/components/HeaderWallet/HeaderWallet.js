import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppButton from '../AppButton/AppButton';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const HeaderWallet = ({
  networkType,
  networkId,
  chainId,
  coinbase = {},
}) => {
  const classes = useStyles();

  if (!coinbase.address) {
    return (
      <AppButton disabled>
        Connect wallet
      </AppButton>
    );
  }

  const tooltip = (<>
    <span>network Id: {networkId}</span><br />
    <span>chain Id: {chainId}</span>
  </>);

  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>
        {networkType}
        <AppInfoButton classes={{ button: classes.infoButton }}>
          {tooltip}
        </AppInfoButton>
      </Typography>

      <AppEtherAddress
        className={classes.address}
        address={coinbase.address}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  coinbase: s.selectCoinbaseAccount(state),
  networkType: s.selectNetworkType(state),
  networkId: s.selectNetworkId(state),
  chainId: s.selectChainId(state),
});

export default connect(mapStateToProps)(HeaderWallet);
