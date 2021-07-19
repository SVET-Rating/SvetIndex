import React from 'react';
import { connect } from 'react-redux';
import { SWAP_MODE } from '../ethvtx_config/reducers/reducers-constants';
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

const InvestmentsPage = ({ mode, processState }) => {
  let processStateComponent;
  let buyIndexSteps;

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
        <DotLoader color={color} loading css={override} size={150} />
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
});

export default connect(mapStatToProps)(InvestmentsPage);
