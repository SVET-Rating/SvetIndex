import React from 'react';
import { connect } from 'react-redux';
import * as c from '../ethvtx_config/reducers/reducers-constants';
import { selectSwapMode, selectSwapProcessState } from '../ethvtx_config/selectors/selectors';
import AssetsBlock from '../components/AssetsBlock/AssetsBlock';
import SwapAssetForm from '../components/SwapAssetForm/SwapAssetForm';
import SwapResultModalMessage from '../components/SwapResultModalMessage/SwapResultModalMessage';
import AssetItemTokensBlock from '../components/AssetItemTokensBlock/AssetItemTokensBlock';
// import BuyIndexTokensSteps from '../components/buyIndexSteps';
// import SellIndexTokensSteps from '../components/selllIndexSteps';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import {
  selectSvetTokenContract,
  selectExpertsContract,
  selectExchangeContract,
  selectOraclePriceContract,
  selectOracleCircAmountContract,
  selectOracleTotSupplyContract,
  selectIndexSwapContract,
  selectIndexFactoryContract,
  selectLstorageContract,
  selectIndexStorageContract,
} from '../ethvtx_config/selectors/selectors';

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
  let processStateComponent;
  let buyIndexSteps;

  console.dir(contract1)
  console.dir(contract2)
  console.dir(contract3)
  console.dir(contract4)
  console.dir(contract5)
  console.dir(contract6)
  console.dir(contract7)
  console.dir(contract8)
  console.dir(contract9)
  console.dir(contract10)

  if (!mode) {
    processStateComponent = (
      <AssetsBlock />
    );
  }

  if (mode) {
    processStateComponent = (
      <div className="tokens-container">
        <div className="left-list">
          <SwapAssetForm />
        </div>

        <div className="right-list">
          <AssetItemTokensBlock />
        </div>
      </div>
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
    <div>
      <SwapResultModalMessage />
      {buyIndexSteps}
      {processStateComponent}
    </div>
  );
};

const mapStatToProps = (state) => ({
  mode: selectSwapMode(state),
  processState: selectSwapProcessState(state),

  contract1: selectSvetTokenContract(state),
  contract2: selectExpertsContract(state),
  contract3: selectExchangeContract(state),
  contract4: selectOraclePriceContract(state),
  contract5: selectOracleCircAmountContract(state),
  contract6: selectOracleTotSupplyContract(state),
  contract7: selectIndexSwapContract(state),
  contract8: selectIndexFactoryContract(state),
  contract9: selectLstorageContract(state),
  contract10: selectIndexStorageContract(state),
});

export default connect(mapStatToProps)(InvestmentsPage);
