import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as selectors from '../../ethvtx_config/selectors/selectors';
import { setSwapInAmount } from '../../ethvtx_config/actions/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import { isNumber } from '../../helpers';
import AppInput from '../AppInput/AppInput';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  symbol, balance, swapAmount, setSwapAmount, mode,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNumber(value) || value < 0) {
      return;
    }
    setSwapAmount(value);
  };

  const handleAllButton = () => {
    if (balance) {
      setSwapAmount(balance);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <label
          className={classes.label}
          htmlFor={ID}
        >
          {symbol}
        </label>

        <AppInput
          className={classes.input}
          id={ID}
          value={swapAmount}
          onChange={handleChange}
        />
      </Box>

      <Box className={classes.balance}>
        <Typography>Balance:</Typography>
        <AppAssetAmount amount={balance || '0.0'} precision={8} />
        {mode === SWAP_MODE.sell && <AppButtonInline
          className={classes.maxButton}
          onClick={handleAllButton}
          disabled={!Number(balance)}
        >
          (all)
        </AppButtonInline>}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  symbol:selectors.selectAssetInSymbol(state),
  balance: selectors.selectAssetInBalance(state),
  swapAmount: selectors.selectSwapInAmount(state),
  mode: selectors.selectSwapMode(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
