import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { selectCoinbaseAccount, selectNetworkType } from '../../ethvtx_config/selectors/selectors';
import AppButton from '../AppButton/AppButton';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import useStyles from './styles';

const HeaderWallet = ({ network, coinbase = {} }) => {
  const classes = useStyles();

  return coinbase.address ? (
      <Box className={classes.root}>
        <Typography>{network}</Typography>
        <AppEtherAddress
          className={classes.address}
          address={coinbase.address}
        />
      </Box>
    ) : (
      <AppButton disabled>
        Connect wallet
      </AppButton>
    );
};

const mapStateToProps = (state) => ({
  coinbase: selectCoinbaseAccount(state),
  network: selectNetworkType(state),
});

export default connect(mapStateToProps)(HeaderWallet);
