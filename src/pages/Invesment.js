/* eslint-disable react/no-typos */
import React from 'react';
import { connect } from 'react-redux';
import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList';
// import SvetPaymentMethods from '../components/buyTokens/buySvetPaymentMethods';
// import SvetPaymentMethodsForm from '../components/buyTokens/buySvetTokensForm';
// import IndexTokenPaymentForm from '../components/buyTokens/buyIndexTokensForm';
import BuyAssetForm from '../components/BuyAssetForm/BuyAssetForm';
import SellIndexTokenForm from '../components/sellTokens/sellIndexTokensForm';
import BuyIndexTokensSteps from '../components/buyIndexSteps';
import SellIndexTokensSteps from '../components/selllIndexSteps';
import TransactionFailModal from '../components/TransactionFailModal';
import {
  SELECT_INDEX_TOKEN,
  // BUY_SVET_PAYMENT_METHOD,
  // BUY_SVET_PAYMENT_FORM,
  BUY_INDEX_TOKEN,
} from '../ethvtx_config/processStates/buyTokenProcessStates';
import { SELL_INDEX_TOKEN } from '../ethvtx_config/processStates/sellTokenProcessStates';
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

const investmentPage = (props) => {
  let processStateComponent;
  let buyIndexSteps;

  if (props.processState === SELECT_INDEX_TOKEN) {
    processStateComponent = (
      <IndexTokenList/>
    );
  }

  // if (props.processState === BUY_SVET_PAYMENT_METHOD) {
  //   processStateComponent =  <SvetPaymentMethods />
  // }

  // if (props.processState === BUY_SVET_PAYMENT_FORM) {
  //   processStateComponent = <SvetPaymentMethodsForm />
  // }

  if (props.processState === BUY_INDEX_TOKEN) {
    processStateComponent = (
      <div className="tokens-container">
        <div className="left-list">
          <BuyAssetForm />
        </div>

        <div className="right-list">
          <TokensInIndexTokenList />
        </div>
      </div>
    );
  }

  if (props.processStateSell == SELL_INDEX_TOKEN) {
    // processStateComponent = <SellIndexTokenForm />
    processStateComponent = (
      <div className="tokens-container">
        <div className="left-list">
          <SellIndexTokenForm />
        </div>

        <div className="right-list">
          <TokensInIndexTokenList />
        </div>
      </div>
    );
  }

  if (props.start_approve) {
    let loading = true
    let color = '#23dcd5'
    buyIndexSteps = (
      <>
        <BuyIndexTokensSteps />
        <DotLoader color={color} loading={loading} css={override} size={150} />
      </>
    );
  }

  if (props.start_approve_sell) {
    let loading = true
    let color = '#23dcd5'
    buyIndexSteps = (
      <>
        <SellIndexTokensSteps />
        <DotLoader color={color} loading={loading} css={override} size={150} />
      </>
    );
  }

  return (
    <div>
      <div>
        {buyIndexSteps}
        <TransactionFailModal />
      </div>

      {processStateComponent}
      {/* <div className="tokens-container">
        <div className="left-list">
          {processStateComponent}
        </div>

        <div className="right-list">
          <TokensInIndexTokenList />
        </div>
      </div> */}
    </div>
  );
};

const mapStatToProps = (state) => ({
  processState: state.buyTokensReducer.buyTokenProcessState,
  processStateSell: state.sellIndexTokenReducer.sellTokenProcessState,
  start_approve: state.buyTokensReducer.start_aprove,
  start_approve_sell: state.sellIndexTokenReducer.start_aprove_sell,
  buyindex_end: state.buyTokensReducer.buyindex_end
});

export default connect(mapStatToProps, null)(investmentPage);
