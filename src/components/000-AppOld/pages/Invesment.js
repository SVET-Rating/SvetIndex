import React from 'react';
import { connect } from 'react-redux';
// import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList';
// import SvetPaymentMethods from '../components/buyTokens/buySvetPaymentMethods';
// import SvetPaymentMethodsForm from '../components/buyTokens/buySvetTokensForm';
// import IndexTokenPaymentForm from '../components/buyTokens/buyIndexTokensForm';
// import SellIndexTokenForm from '../components/sellTokens/sellIndexTokensForm';
import { SWAP_MODE } from '../ethvtx_config/reducers';
import AssetsBlock from '../components/AssetsBlock/AssetsBlock';
import BuyAssetForm from '../components/BuyAssetForm/BuyAssetForm';
import SellAssetForm from '../components/SellAssetForm/SellAssetForm';
import BuyIndexTokensSteps from '../components/buyIndexSteps';
import SellIndexTokensSteps from '../components/selllIndexSteps';
import TransactionFailModal from '../components/TransactionFailModal';
import Header from '../components/Header/Header';
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

const investmentPage = ({ mode, state }) => {
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
          <TokensInIndexTokenList />
        </div>
      </div>
    );
  }

  if (state) {
    let loading = true
    let color = '#23dcd5'
    buyIndexSteps = (
      <>
        {mode === SWAP_MODE.buy
          ? <BuyIndexTokensSteps />
          : <SellIndexTokensSteps />}
        <DotLoader color={color} loading={loading} css={override} size={150} />
      </>
    );
  }

  return (
    <div>
      <Header />

      <div>
        {buyIndexSteps}
        <TransactionFailModal />
      </div>

      {processStateComponent}
    </div>
  );
};

const mapStatToProps = (state) => ({
  mode: state.swapAssetReducer.mode,
  state: state.swapAssetReducer.state,
  // processState: state.buyTokensReducer.buyTokenProcessState,
  // processStateSell: state.sellIndexTokenReducer.sellTokenProcessState,
  // start_approve: state.buyTokensReducer.start_aprove,
  // start_approve_sell: state.sellIndexTokenReducer.start_aprove_sell,
  // buyindex_end: state.buyTokensReducer.buyindex_end,
});

export default connect(mapStatToProps)(investmentPage);
