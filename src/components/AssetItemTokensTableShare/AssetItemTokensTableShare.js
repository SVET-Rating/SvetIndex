import React from 'react';
import { Box, TableRow, TableCell } from '@material-ui/core';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensTableShare = ({ token: { symbol, addrActive, amount }}) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">
        <Box className={classes.symbol}>
          <AppTokenAddressIdenticon address={addrActive} size="1rem" />
          &nbsp;
          {symbol}
        </Box>
      </TableCell>

      <TableCell align="center">
        <AppEtherAddress address={addrActive} />
      </TableCell>

      <TableCell align="center">
        {(amount / 100).toFixed(2)}%
      </TableCell>

      <TableCell align="right">
        {/* {props.balActiveFn(props.currentAddress, props.indexToken.tokenAddress, addrActive) / 10 ** 18} */}
        value
      </TableCell>
    </TableRow>
  );
}

export default AssetItemTokensTableShare;
