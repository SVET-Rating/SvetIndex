import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
// import * as c from '../../ethvtx_config/reducers/reducers-constants';
import AssetsBlock from '../../components/AssetsBlock/AssetsBlock';
import SwapAssetForm from '../../components/SwapAssetForm/SwapAssetForm';
import SwapResultModalMessage from '../../components/SwapResultModalMessage/SwapResultModalMessage';
import AssetItemTokensBlock from '../../components/AssetItemTokensBlock/AssetItemTokensBlock';
// import BuyIndexTokensSteps from '../components/buyIndexSteps';
// import SellIndexTokensSteps from '../components/selllIndexSteps';
// import SwapStepsItem from '../../components/SwapStepsItem/SwapStepsItem';
import useStyles from './styles';

const InvestmentsPage = ({
  mode,
  contract1,
  contract2,
  contract3,
  contract4,
  contract5,
  contract6,
  contract7,
  contract8,
  contract9,
  contract10,
}) => {
  const classes = useStyles();

  let processStateComponent;

  // console.dir(contract1)
  // console.dir(contract2)
  // console.dir(contract3)
  // console.dir(contract4)
  // console.dir(contract5)
  // console.dir(contract6)
  // console.dir(contract7)
  // console.dir(contract8)
  // console.dir(contract9)
  // console.dir(contract10)

  if (!mode) {
    processStateComponent = (
      <AssetsBlock />
    );
  }

  if (mode) {
    processStateComponent = (
      <Box className={classes.root}>
        <SwapAssetForm />
        <AssetItemTokensBlock />
      </Box>
    );
  }

  return (
    <Box>
      <SwapResultModalMessage />
      {/* <SwapStepsItem /> */}
      {processStateComponent}
    </Box>
  );
};

const mapStatToProps = (state) => ({
  mode: s.selectSwapMode(state),

  contract1: s.selectSvetTokenContract(state),
  contract2: s.selectExpertsContract(state),
  contract3: s.selectExchangeContract(state),
  contract4: s.selectOraclePriceContract(state),
  contract5: s.selectOracleCircAmountContract(state),
  contract6: s.selectOracleTotSupplyContract(state),
  contract7: s.selectIndexSwapContract(state),
  contract8: s.selectIndexFactoryContract(state),
  contract9: s.selectLstorageContract(state),
  contract10: s.selectIndexStorageContract(state),
});

export default connect(mapStatToProps)(InvestmentsPage);
