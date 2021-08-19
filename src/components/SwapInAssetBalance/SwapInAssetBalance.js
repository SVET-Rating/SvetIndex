import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import { isNumber } from '../../helpers';
import AppInput from '../AppInput/AppInput';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useDebounce from '../../hooks/useDebounce';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  symbol, balance, swapAmount, setSwapAmount, mode,
}) => {
  const [amount, setAmount] = useDebounce('', 200);

  useEffect(() => {
    if (amount) {
      setSwapAmount(amount);
    }
  }, [amount]);

  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (isNumber(value) || value >= 0) {
      setAmount(value);
    }
  };

  const handleAllButton = () => {
    if (balance && balance !== swapAmount) {
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
          disabled={!Number(balance) || balance === swapAmount}
        >
          (all)
        </AppButtonInline>}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  symbol: s.selectAssetInSymbol(state),
  balance: s.selectAssetInBalance(state),
  swapAmount: s.selectSwapInAmount(state),
  mode: s.selectSwapMode(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(a.setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
