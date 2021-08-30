import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import * as c from '../../ethvtx_config/reducers/reducers-constants';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetsBlock from '../../components/AssetsBlock/AssetsBlock';
import SwapAssetForm from '../../components/SwapAssetForm/SwapAssetForm';
import SwapResultModalMessage from '../../components/SwapResultModalMessage/SwapResultModalMessage';
import AssetItemTokensBlock from '../../components/AssetItemTokensBlock/AssetItemTokensBlock';
// import BuyIndexTokensSteps from '../components/buyIndexSteps';
// import SellIndexTokensSteps from '../components/selllIndexSteps';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import useStyles from './styles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  width: 11%;
  height: 30%;
  position: absolute;
  left: 41%;
  top: 41%;
  z-index: 1000
`;

const InvestmentsPage = ({
  mode, processState,
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
  let buyIndexSteps;

  // console.dir(contract1)
  // console.dir(contract2)
  // console.dir(contract3)
  console.dir(contract4)
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

  if (processState) {
    let color = '#23dcd5'
    buyIndexSteps = (
      <>
        {/* {mode === SWAP_MODE.buy
          ? <BuyIndexTokensSteps />
          : <SellIndexTokensSteps />} */}
        <DotLoader
          color={color}
          loading={processState !== c.SWAP_STATE.end}
          css={override}
          size={150}
        />
      </>
    );
  }

  return (
    <Box>
      <SwapResultModalMessage />
      {buyIndexSteps}
      {processStateComponent}
    </Box>
  );
};

const mapStatToProps = (state) => ({
  mode: s.selectSwapMode(state),
  processState: s.selectSwapProcessState(state),

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
