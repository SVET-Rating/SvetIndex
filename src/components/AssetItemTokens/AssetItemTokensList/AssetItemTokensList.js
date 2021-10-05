import React from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import AssetItemTokensListShare from './AssetItemTokensListShare/AssetItemTokensListShare';
import useStyles from './styles';

const AssetItemTokensList = ({ tokens = [] }) => {
  const classes = useStyles();

  if (!tokens.length) {
    return null;
  }

  const tokensList = tokens.map((item) => (
    <AssetItemTokensListShare key={item.symbol} token={item}/>
  ));

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {tokensList}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetItemTokensList;
