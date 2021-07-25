import React from 'react';
import { Box } from '@material-ui/core';
import { Jazzicon } from '@ukstv/jazzicon-react';
import useStyles from './styles';

const TokenAddressIdenticon = ({ address = '', size = '1rem', className = '' }) => {
  const classes = useStyles();

  return (
    <Box
      className={`${classes.root} ${className}`}
      style={{ width: size, height: size }}
    >
      <Jazzicon address={address} />
    </Box>
  );
}

export default TokenAddressIdenticon;
