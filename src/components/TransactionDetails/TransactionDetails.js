import React from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';

const TransactionDetails = ({ gasAmount, gasPrice, currentBlock }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.block}>
        <Typography className={classes.text}>Gas amount:</Typography>
        <Typography className={classes.value}>
          {gasAmount}
        </Typography>
      </Box>

      <Box className={classes.block}>
        <Typography className={classes.text}>Gas price:</Typography>
        <Typography className={classes.value}>
          {gasPrice}&nbsp;Gwei
        </Typography>
      </Box>

      <Box className={classes.block}>
        <Typography className={classes.text}>Transaction cost:</Typography>
        <Typography className={classes.value}>
          {Number(gasAmount * gasPrice / 10 ** 9).toFixed(10)}&nbsp;ETH
        </Typography>
      </Box>

      <Box className={classes.block}>
        <Typography className={classes.text}>Current block:</Typography>
        <Typography className={classes.value}>
          {currentBlock}
        </Typography>
      </Box>
    </Box>
  );
}

const getIndexGasAmount = (state) => {
  const actList = getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress)
    .fn.getActivesList();

  if (actList) {
    return Math.round((actList.length * 161387 + 44160 + 52010) * 1.02);
  }

  return 0;
};

const mapStateToProps = (state) => ({
  gasAmount: getIndexGasAmount(state),
  gasPrice: state.buyTokensReducer.gasPrice,
  currentBlock: state.blocks.current_height,
});

export default connect(mapStateToProps)(TransactionDetails);
