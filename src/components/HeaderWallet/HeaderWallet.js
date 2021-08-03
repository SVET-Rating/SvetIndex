import React from 'react';
import { connect } from 'react-redux';
import { getAccount } from 'ethvtx/lib/getters';
import Button from '../Button/Button';
import EtherAddress from '../EtherAddress/EtherAddress';
import useStyles from './styles';

const HeaderWallet = ({ coinbase = {} }) => {
  const classes = useStyles();

  return coinbase.address ? (
      <EtherAddress
        className={classes.root}
        address={coinbase.address}
      />
    ) : (
      <Button disabled>
        Connect wallet
      </Button>
    );
};

const mapStateToProps = (state) => ({
  coinbase: getAccount(state, '@coinbase'),
});

export default connect(mapStateToProps)(HeaderWallet);
