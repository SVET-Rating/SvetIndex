import React from 'react';
import { connect } from 'react-redux';
import { Box, TableRow, TableCell } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensTableShare = ({ token: { symbol, addrActive }, amount = 0, share = 0 }) => {
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
        <AppEtherAddress className={classes.address} address={addrActive} />
      </TableCell>

      <TableCell align="center">
        {(share * 100).toFixed(1)}%
      </TableCell>

      <TableCell align="right">
        <AppAssetAmount
          className={classes.value}
          amount={amount}
          precision={6}
        />
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state, { token }) => ({
  share: s.selectAssetInTokenShare(state, token.addrActive, token.amount),
  amount: s.selectFromWei(state, token.amount),
});

export default connect(mapStateToProps)(AssetItemTokensTableShare);
