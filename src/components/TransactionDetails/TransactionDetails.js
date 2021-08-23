import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as a from '../../ethvtx_config/actions/actions';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const ETHER_SYMBOL = 'ETH';
const GWEI_SYMBOL = 'Gwei';
const USD_SYMBOL = '$';

const TransactionDetails = ({
  gasAmount, gasPrice, stablePrice, currentBlock, getGasPrice,
}) => {
  useEffect(() => {
    getGasPrice();
  }, [currentBlock]);

  const classes = useStyles();

  const transactionCost = Number(gasAmount * gasPrice / 10 ** 9).toFixed(12);
  const transactionCostInStable = Number(stablePrice) && String(transactionCost / stablePrice);

  return (
    <Box className={classes.root}>
      <Box className={classes.record}>
        <Typography className={classes.text}>Current block:</Typography>
        <Typography className={classes.value}>
          {currentBlock.number}
        </Typography>
      </Box>

      <Box className={classes.record}>
        <Typography className={classes.text}>Gas amount:</Typography>
        <Typography className={classes.value}>
          {gasAmount}
        </Typography>
      </Box>

      <Box className={classes.record}>
        <Typography className={classes.text}>Gas price:</Typography>
        <AppAssetAmount
          className={classes.value}
          amount={gasPrice}
          precision={1}
          symbol={GWEI_SYMBOL}
        />
      </Box>

      <Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography className={classes.text}>Transaction cost:</Typography>
          <AppAssetAmount
            className={classes.value}
            amount={transactionCost}
            precision={Number(transactionCost) && 6}
            symbol={ETHER_SYMBOL}
          />
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <AppAssetAmount
            className={classes.value}
            amount={transactionCostInStable || '0'}
            symbol={USD_SYMBOL}
            precision={2}
            withParentheses
          />
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  gasAmount: s.selectSwapAssetGasAmount(state) || '0',
  gasPrice: s.selectGasPrice(state) || '0',
  stablePrice: s.selectFromWei(state, s.selectStableTokenPrice(state)) || '0',
  currentBlock: s.selectCurrentBlock(state),
});

const mapDispatchToProps = (dispatch) => ({
  getGasPrice: () => dispatch(a.getGasPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
