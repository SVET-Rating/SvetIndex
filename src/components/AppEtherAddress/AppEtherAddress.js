import React from 'react';
import { EthAddress } from 'rimble-ui';
import useStyles from './styles';

const AppEtherAddress = ({ address, className = '' }) => {
  const classes = useStyles();

  return (
    <EthAddress
      className={`${classes.root} ${className}`}
      address={address}
    />
  );
}

export default AppEtherAddress;
