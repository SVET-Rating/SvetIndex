import React from 'react';
import { connect } from 'react-redux';
import { SWAP_MODE, SWAP_STATE } from '../ethvtx_config/reducers/reducers-constants';
import { selectSwapMode, selectSwapProcessState } from '../ethvtx_config/selectors/selectors';
import AssetsBlock from '../components/AssetsBlock/AssetsBlock';
import BuyAssetForm from '../components/BuyAssetForm/BuyAssetForm';
import SellAssetForm from '../components/SellAssetForm/SellAssetForm';
// import TransactionFailModal from '../components/TransactionFailModal';
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
          {mode === SWAP_MODE.buy
            ? <BuyAssetForm />
            : <SellAssetForm />}
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
          loading={processState !== SWAP_STATE.end}
          css={override}
          size={150}
        />
      </>
    );
  }

  return (
    <div>
      {/* <TransactionFailModal /> */}
      {buyIndexSteps}
      {processStateComponent}
    </div>
  );
};

const mapStatToProps = (state) => ({
  mode: selectSwapMode(state),
  processState: selectSwapProcessState(state),
  // processState: state.buyTokensReducer.buyTokenProcessState,
  // processStateSell: state.sellIndexTokenReducer.sellTokenProcessState,
  // start_approve: state.buyTokensReducer.start_aprove,
  // start_approve_sell: state.sellIndexTokenReducer.start_aprove_sell,
  // buyindex_end: state.buyTokensReducer.buyindex_end,
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
