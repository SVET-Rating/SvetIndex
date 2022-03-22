import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import * as a from '../../ethvtx_config/actions/actions';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useDebounce from '../../hooks/useDebounce';
import useStyles from './styles';

const ID = 'swapInAsset';

const SwapInAssetBalance = ({
  symbol, balance, swapAmount, setSwapAmount, mode, processState,
}) => {
  const classes = useStyles();

  const [amount, setAmount] = useDebounce(null, 100);
  useEffect(() => {
    if (amount !== null) {
      setSwapAmount(amount);
    }
  }, [amount]);

  const handleChange = (e) => {
    const { value } = e.target;

    if (value.startsWith('+') || value.startsWith('-')) {
      setAmount(value.slice(1));
    } else {
      setAmount(value);
    }
  };

  const handleAllButton = () => {
    if (balance && balance !== swapAmount) {
      setSwapAmount(balance);
    }
  };

  const isActionsDisabled = !!processState;
  const isAllButtonDisabled = !Number(balance) || balance === swapAmount;

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
          type='number'
          autoComplete='off'
          id={ID}
          disabled={isActionsDisabled}
          value={swapAmount}
          onChange={handleChange}
        />
      </Box>

      <Box className={classes.balance}>
        <Typography>
          Balance:
        </Typography>
        <AppAssetAmount
          classes={{ root: classes.balanceAmount}}
          amount={balance || '0.0'}
          precision={8}
        />
        {mode === c.SWAP_MODE.sell && (
          <AppButtonInline
            className={classes.maxButton}
            onClick={handleAllButton}
            disabled={isAllButtonDisabled || isActionsDisabled}
          >
            (all)
          </AppButtonInline>)
        }
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  symbol: s.selectAssetInSymbol(state),
  balance: s.selectAssetInBalance(state),
  swapAmount: s.selectSwapInAmount(state),
  mode: s.selectSwapMode(state),
  processState: s.selectSwapProcessState(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSwapAmount: (value) => dispatch(a.setSwapInAmount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapInAssetBalance);
