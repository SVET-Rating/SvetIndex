import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const HeaderChainInfo = ({
  className,
  networkId,
  chainId,
  chainName,
  chainNetwork,
  chain,
  nativeCurrencyName,
  nativeCurrencySymbol,
}) => {
  const classes = useStyles();

  if (!chainName) {
    return null;
  }

  const tooltip = (
    <Typography>
      <span>{`${chainNetwork} (${chain})`}</span><br />
      <span>currency: {`${nativeCurrencyName} (${nativeCurrencySymbol})`}</span><br />
      <span>network Id: {networkId}</span><br />
      <span>chain Id: {chainId}</span>
    </Typography>
  );

  return (
    <Typography className={`${classes.root} ${className}`}>
      {chainName}

      <AppInfoButton
        classes={{
          button: classes.infoButton,
          paper: classes.infoPaper,
        }}
      >
        {tooltip}
      </AppInfoButton>
    </Typography>
  );
};

const mapStateToProps = (state) => ({
  networkId: s.selectNetworkId(state),
  chainId: s.selectChainId(state),
  chainName: s.selectChainName(state),
  chainNetwork: s.selectChainNetwork(state),
  chain: s.selectChain(state),
  nativeCurrencyName: s.selectNativeCurrencyName(state),
  nativeCurrencySymbol: s.selectNativeCurrencySymbol(state),
});

export default connect(mapStateToProps)(HeaderChainInfo);
