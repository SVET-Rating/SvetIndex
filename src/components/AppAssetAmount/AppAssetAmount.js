import React from 'react';
// import BN from 'bn.js';
import { Box, Typography } from '@material-ui/core';
import { toPrecision } from '../../helpers';
import useStyles from './styles';

const LEFT_PARENTHESIS = '(';
const RIGHT_PARENTHESIS = ')';

const AppAssetAmount = ({
  amount = null,
  symbol = null,
  precision = -1,
  withParentheses = false,
  className = '',
}) => {
  const classes = useStyles();

  const normalizedAmount = precision && amount
    ? toPrecision(amount, precision)
    : amount;

  return amount ? (
    <Box className={`${classes.root} ${className}`}>
      {withParentheses && <Typography>{LEFT_PARENTHESIS}</Typography>}
      <Typography className={classes.amount}>{normalizedAmount}</Typography>
      {symbol && <Typography className={classes.symbol}>{symbol}</Typography>}
      {withParentheses && <Typography>{RIGHT_PARENTHESIS}</Typography>}
    </Box>
  ) : null;
};

export default AppAssetAmount;
