import React from 'react';
import { Box, TableRow, TableCell } from '@material-ui/core';
import AppEtherAddress from '../../AppEtherAddress/AppEtherAddress';
import AppAssetAmount from '../../AppAssetAmount/AppAssetAmount';
import AppTokenAddressIdenticon from '../../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import AppGoToScanLink from '../../AppGoToScanLink/AppGoToScanLink';
import useStyles from './styles';

const AssetItemTokensTableShare = ({ token }) => {
  const classes = useStyles();

  if (!token) {
    return null;
  }

  const { symbol, addrActive, share, amount } = token;

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
        <Box className={classes.address}>
          <AppEtherAddress address={addrActive} />
          <AppGoToScanLink address={addrActive} />
        </Box>
      </TableCell>

      <TableCell align="right">
        <AppAssetAmount
          classes={{
            root: classes.amountValue,
            symbol: classes.amountSymbol,
          }}
          amount={(share * 100).toFixed(2)}
          symbol={'%'}
        />
      </TableCell>

      <TableCell align="right">
        <AppAssetAmount
          classes={{ root: classes.amountValue}}
          amount={amount}
          precision={6}
        />
      </TableCell>
    </TableRow>
  );
}

export default AssetItemTokensTableShare;
