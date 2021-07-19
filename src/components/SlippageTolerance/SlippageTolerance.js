import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { selectSlippage } from '../../ethvtx_config/selectors/selectors';
import { setSlippage } from '../../ethvtx_config/actions/actions';
import { SETTINGS } from '../../ethvtx_config/reducers/reducers-constants';
import AppInput from '../AppInput/AppInput';
import useStyles from './styles';

const INPUT_ID = 'SlippageToleranceId';

const SlippageTolerance = ({ slippage, setSlippage }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || !Number.isInteger(Number(value)) || value < 1 || value > SETTINGS.maxSlippage) {
      return;
    }
    setSlippage(Number.parseInt(value) || 1);
  };

  return (
    <Box className={classes.root}>
      <label
        className={classes.label}
        htmlFor={INPUT_ID}
      >Slippage tolerance?</label>

      <Typography>
        <AppInput
          className={classes.input}
          id={INPUT_ID}
          value={slippage}
          onChange={handleChange}
        />
        &nbsp;%
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  slippage: selectSlippage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSlippage: (value) => dispatch(setSlippage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlippageTolerance);
