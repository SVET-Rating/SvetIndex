import React from 'react';
import { Jazzicon } from '@ukstv/jazzicon-react';
import useStyles from './styles';

const TokenAddressIdenticon = ({ address = '', size = '1rem', className = '' }) => {
  const classes = useStyles();

  return (
    <Jazzicon
      className={`${classes.root} ${className}`}
      address={address}
      style={{ width: `${size}`, height: `${size}` }}
    />
  );
}

export default TokenAddressIdenticon;
