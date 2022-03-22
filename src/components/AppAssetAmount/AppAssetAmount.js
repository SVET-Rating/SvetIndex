import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { toPrecision } from '../../helpers';
import useStyles from './styles';

const LEFT_PARENTHESIS = '(';
const RIGHT_PARENTHESIS = ')';

const AppAssetAmount = ({
  amount,
  symbol = null,
  precision = -1,
  withParentheses = false,
  classes: {
    root,
    amount: rootAmount,
    symbol: rootSymbol,
  } = {},
}) => {
  const cl = useStyles();

  const normalizedAmount = precision && amount
    ? toPrecision(amount, precision)
    : amount;

  return (
    <Box className={`${cl.root} ${root}`}>
      {withParentheses && <Typography>{LEFT_PARENTHESIS}</Typography>}
      <Typography className={`${cl.amount} ${rootAmount}`}>{normalizedAmount || '...'}</Typography>
      {symbol && <Typography className={`${cl.symbol} ${rootSymbol}`}>{symbol}</Typography>}
      {withParentheses && <Typography>{RIGHT_PARENTHESIS}</Typography>}
    </Box>
  );
};

export default AppAssetAmount;
