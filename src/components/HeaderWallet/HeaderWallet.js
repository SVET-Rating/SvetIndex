import React from 'react';
import { connect } from 'react-redux';
import { getAccount } from 'ethvtx/lib/getters';
import AppButton from '../AppButton/AppButton';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import useStyles from './styles';

const HeaderWallet = ({ coinbase = {} }) => {
  const classes = useStyles();

  return coinbase.address ? (
      <AppEtherAddress
        className={classes.root}
        address={coinbase.address}
      />
    ) : (
      <AppButton disabled>
        Connect wallet
      </AppButton>
    );
};

const mapStateToProps = (state) => ({
  coinbase: getAccount(state, '@coinbase'),
});

export default connect(mapStateToProps)(HeaderWallet);
