import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetItemTokensTableShare from '../AssetItemTokensTableShare/AssetItemTokensTableShare';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const TOKEN_ADDRESS = 'What is token address?';
const TOKEN_PERCENTAGE_SHARE = 'What is token percentage share?';
const TOKEN_BALANCE = 'What is token balance?';

const titles = [
  { name: 'SYMBOL', align: 'left', info: null },
  { name: 'ADDRESS', align: 'center', info: TOKEN_ADDRESS },
  { name: '%', align: 'center', info: TOKEN_PERCENTAGE_SHARE },
  { name: 'BALANCE', align: 'right', info: TOKEN_BALANCE },
];

const AssetItemTokensTable = ({ tokensList = [] }) => {
  const classes = useStyles();

  if (!tokensList.length) {
    return null;
  }

  const headers = (
    <TableRow>
      {titles.map(({ name, align, info }) => (
        <TableCell key={name} align={align}>
          <Typography>
            <span>{name}</span>
            {info && <AppInfoButton
              classNameButton={classes.infoButton}
              content={info}
            />}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );

  const tokens = tokensList.map((item) => (
    <AssetItemTokensTableShare key={item.symbol} token={item}/>
  ));

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHeader}>
          {headers}
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
