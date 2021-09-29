import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import * as s from '../../../ethvtx_config/selectors/selectors';
import AssetItemTokensListShare from './AssetItemTokensListShare/AssetItemTokensListShare';
import useStyles from './styles';

const AssetItemTokensList = ({ tokensList = [] }) => {
  const classes = useStyles();

  if (!tokensList.length) {
    return null;
  }

  const tokens = tokensList.map((item) => (
    <AssetItemTokensListShare key={item.symbol} token={item}/>
  ));

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {tokens}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state, { address }) => ({
  tokensList: s.selectAssetInTokensList(state),
});

export default connect(mapStateToProps)(AssetItemTokensList);
