import React from 'react';
import { Box, TableRow, TableCell } from '@material-ui/core';
import EtherAddress from '../EtherAddress/EtherAddress';
import TokenAddressIdenticon from '../TokenAddressIdenticon/TokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensTableShare = ({ token }) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">
        <Box className={classes.ticket}>
          <TokenAddressIdenticon address={token.addrActive} size="1rem" />
          &nbsp;
          {token.symbol}
        </Box>
      </TableCell>
      <TableCell align="center">
        <EtherAddress address={token.addrActive} />
      </TableCell>
      <TableCell align="center">
        {(token.amount / 100).toFixed(2)}%
      </TableCell>
      <TableCell align="right">
        {/* {props.balActiveFn(props.currentAddress, props.indexToken.tokenAddress, token.addrActive) / 10 ** 18} */}
        value
      </TableCell>
    </TableRow>
  );
}

export default AssetItemTokensTableShare;
