import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import EtherAddress from '../EtherAddress/EtherAddress';
import TokenAddressIdenticon from '../TokenAddressIdenticon/TokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensTableShare = ({ token }) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell component="th" scope="row">
        <TokenAddressIdenticon address={token.addrActive} size="1rem" />
        &nbsp;
        {token.symbol}
      </TableCell>
      <TableCell align="right">
        <EtherAddress address={token.addrActive} />
      </TableCell>
      <TableCell align="right">
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
