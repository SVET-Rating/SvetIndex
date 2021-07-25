import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const AssetAmount = ({
  amount = null,
  label = null,
  precision = 0,
  withParentheses = false,
  className = '',
}) => {
  const classes = useStyles();

  const normalizeAmount = precision && amount
    ? amount.toFixed(precision)
    : amount;

  return (
    <Typography className={`${classes.root} ${className}`}>
      {withParentheses && '( '}
      {amount && <span className={classes.amount}>{normalizeAmount}</span>}
      {label && <span className={classes.label}>{label}</span>}
      {withParentheses && ' )'}
    </Typography>
  );
};

export default AssetAmount;
