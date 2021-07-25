import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import EtherAddress from '../EtherAddress/EtherAddress';
import useStyles from './styles';

const HeaderWallet = ({ walletAddress }) => {
  const classes = useStyles();

  return walletAddress ? (
      <EtherAddress
        className={classes.root}
        address={walletAddress}
      />
    ) : (
      <Button disabled>
        Connect wallet
      </Button>
    );
};

const mapStateToProps = (state) => ({
  walletAddress: '',
});

export default connect(mapStateToProps)(HeaderWallet);
