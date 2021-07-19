import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';
import tokenColors from '../../assets/colors.json';

import AssetItemTokensTableShare from '../AssetItemTokensTableShare/AssetItemTokensTableShare';
import useStyles from './styles';

const AssetItemTokensTable = (props) => {
  const classes = useStyles();

  let getTokensByActiveIndexToken;
  const labels = [];
  const data_percent = [];
  const backgroundColor = [];
  const hoverBackgroundColor = [];

  //get active index token from list
  if (props.indexList === undefined) {
    return <Box>Click on index token name to view it portfolio</Box>
  } else {
    props.tokens(props.indexList);

    getTokensByActiveIndexToken = props.indexList.map((item, key) => {
      labels.push(item.symbol);
      data_percent.push(item.amount / 100);
      const randomColor = tokenColors.colors[key];
      backgroundColor.push(randomColor);
      hoverBackgroundColor.push(randomColor);

      return (
        <AssetItemTokensTableShare key={item.symbol} token={item}/>
      );
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="right" style={{fontSize: '1.2rem'}}>SYMBOL</TableCell>
              <TableCell align="right" style={{fontSize: '1.2rem'}}>ADDRESS</TableCell>
              <TableCell align="right" style={{fontSize: '1.2rem'}}>%</TableCell>
              <TableCell align="right" style={{fontSize: '1.2rem'}}>BALANCE</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getTokensByActiveIndexToken}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Typography variant="h3">
          {props.indexToken.indexTokenName}
        </Typography>

        <Pie data={{
          labels,
          datasets: [{
            data: data_percent,
            backgroundColor,
            hoverBackgroundColor
          }],
        }} />
      </Box>
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
