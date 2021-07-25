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
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';
import AssetItemTokensTableChart from '../AssetItemTokensTableChart/AssetItemTokensTableChart';
import AssetItemTokensTableShare from '../AssetItemTokensTableShare/AssetItemTokensTableShare';
import useStyles from './styles';

const AssetItemTokensTable = (props) => {
  const classes = useStyles();

  // props.tokens(props.indexList);

  const tokens = props.indexList.map((item) => (
    <AssetItemTokensTableShare key={item.symbol} token={item}/>
  ));

  return (
    <>
      <TableContainer className={classes.root} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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

      <AssetItemTokensTableChart items={props.indexList} />
    </>
  );
};

const getIndexList = (address, state) => {
  if (address === "") {
    return undefined;
  }
  return getContract(state, 'IndexToken', address).fn.getActivesList();
};

const balActiveFn = ( state) => {
  const LS = getContract(state,'Lstorage', '@lstorage');
  if (LS == undefined) {
    return undefined;
  }
  return LS.fn.getBalance;
};

const mapStateToProps = (state) => ({
  indexList: getIndexList(state.indexTokenReducer.activeToken.tokenAddress, state),
  balActiveFn: balActiveFn(state),
  indexToken: state.indexTokenReducer.activeToken,
  currentAddress: state.vtxconfig.coinbase,
});

const mapDispatchToProps = (dispatch) => ({
  tokens: (tokens) => dispatch(getTokensByIndex(tokens)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetItemTokensTable);
