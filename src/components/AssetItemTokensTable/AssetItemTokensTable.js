import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetItemTokensTableShare from '../AssetItemTokensTableShare/AssetItemTokensTableShare';
import useStyles from './styles';

const AssetItemTokensTable = ({ tokensList }) => {
  const classes = useStyles();

  const tokens = tokensList.map((item) => (
    <AssetItemTokensTableShare key={item.symbol} token={item}/>
  ));

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="left">SYMBOL</TableCell>
            <TableCell align="center">ADDRESS</TableCell>
            <TableCell align="center">%</TableCell>
            <TableCell align="right">BALANCE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  tokensList: s.selectAssetInTokensList(state),
});

export default connect(mapStateToProps)(AssetItemTokensTable);
