import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppButton from '../AppButton/AppButton';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import HeaderChainInfo from '../HeaderChainInfo/HeaderChainInfo';
import useStyles from './styles';

const HeaderWallet = ({ coinbase }) => {
  const classes = useStyles();

  if (!coinbase) {
    return (
      <AppButton disabled>
        Connect wallet
      </AppButton>
    );
  }

  return (
    <Box className={classes.root}>
      <HeaderChainInfo className={classes.text} />

      <AppEtherAddress
        className={classes.address}
        address={coinbase.address}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  coinbase: s.selectCoinbaseAccount(state),
});

export default connect(mapStateToProps)(HeaderWallet);
