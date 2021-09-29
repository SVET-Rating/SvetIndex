import React from 'react';
import { connect } from 'react-redux';
import { Box, TableRow, TableCell } from '@material-ui/core';
import * as s from '../../../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppTokenAddressIdenticon from '../AppTokenAddressIdenticon/AppTokenAddressIdenticon';
import useStyles from './styles';

const AssetItemTokensListShare = ({
  token: { symbol, addrActive },
  share = 0,
}) => {
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
    </TableRow>
  );
}

const mapStateToProps = (state, { token }) => ({
  share: s.selectAssetInTokenShare(state, token.addrActive, token.amount),
});

export default connect(mapStateToProps)(AssetItemTokensListShare);
