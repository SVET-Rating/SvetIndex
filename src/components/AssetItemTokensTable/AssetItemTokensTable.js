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
import { getContract } from 'ethvtx/lib/getters';
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

const getTokensList = (state, address) => {
  if (!address) {
    return undefined;
  }
  return getContract(state, 'IndexToken', address).fn.getActivesList();
};

// const balActiveFn = ( state) => {
//   const LS = getContract(state,'Lstorage', '@lstorage');
//   if (LS == undefined) {
//     return undefined;
//   }
//   return LS.fn.getBalance;
// };

const mapStateToProps = (state) => ({
  tokensList: getTokensList(state, state.swapAssetReducer.assetIn),
  // balActiveFn: balActiveFn(state),
  // indexToken: state.swapAssetReducer.asset,
  // currentAddress: state.vtxconfig.coinbase,
});

// const mapDispatchToProps = (dispatch) => ({
//   tokens: (tokens) => dispatch(getTokensByIndex(tokens)),
// });

export default connect(mapStateToProps)(AssetItemTokensTable);
