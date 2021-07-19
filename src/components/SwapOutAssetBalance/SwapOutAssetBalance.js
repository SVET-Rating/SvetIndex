import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { setSwapOutAmount } from '../../ethvtx_config/actions/buyIndexTokensAction';
import useStyles from './styles';

const ID = 'swapOutAsset';

const SwapOutAssetBalance = ({
  assetName, balance, swapAmount, setSwapAmount, isReadonly = false,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || value < 0 /*|| value > balance*/) {
      return;
    }
    setSwapAmount(value);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.amount}>
        <label
          className={classes.label}
          htmlFor={ID}
        >
          {assetName}
        </label>

        <input
          className={classes.input}
          id={ID}
          value={swapAmount}
          readOnly={isReadonly}
          onChange={handleChange}
        />
      </Typography>

      <Typography className={classes.balance}>
        Balance:
        &nbsp;
        <span>{balance ? balance : '0.0'}</span>
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  assetName: state.indexTokenReducer.activeToken.indexTokenName,
  balance: state.indexTokenReducer.activeToken.indexTokenBalance,
  swapAmount: state.buyTokensReducer.swapOutAmount,
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapOutAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapOutAssetBalance);
