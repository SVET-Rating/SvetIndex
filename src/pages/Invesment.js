/* eslint-disable react/no-typos */
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList';
import SvetPaymentMethods from '../components/buyTokens/buySvetPaymentMethods';
import SvetPaymentMethodsForm from '../components/buyTokens/buySvetTokensForm';
import IndexTokenPaymentForm from '../components/buyTokens/buyIndexTokensForm';
import SellIndexTokenForm from '../components/sellTokens/sellIndexTokensForm';
import BuyIndexTokensSteps from '../components/buyIndexSteps'

import {SELECT_INDEX_TOKEN, 
    BUY_SVET_PAYMENT_METHOD, 
    BUY_SVET_PAYMENT_FORM,
    BUY_INDEX_TOKEN} from '../ethvtx_config/processStates/buyTokenProcessStates';
    import { SELECT_INDEX_TOKEN_SELL, SELL_INDEX_TOKEN } from '../ethvtx_config/processStates/sellTokenProcessStates';
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

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
       const media = window.matchMedia('(max-width: 600px)');
       if (media.matches !== matches) {
        setMatches(media.matches);
        //console.log('TEST MEDIA QUERY',media.matches)
      }
      
    }, [matches])

    var processStateComponent;
    var tokensOfIndexToken = '';
    var buyIndexSteps;

    if (!matches) {
          tokensOfIndexToken = <TokensInIndexTokenList />
    }
    
    if (props.processState === SELECT_INDEX_TOKEN) {
        processStateComponent =  <IndexTokenList/>
        
    }
    if (props.processState === BUY_SVET_PAYMENT_METHOD) {
        processStateComponent =  <SvetPaymentMethods />
        
    }

    if (props.processState === BUY_SVET_PAYMENT_FORM) {
        processStateComponent = <SvetPaymentMethodsForm />
    }

    if (props.processState === BUY_INDEX_TOKEN) {
        processStateComponent = <IndexTokenPaymentForm />
    }

    if (props.processStateSell == SELL_INDEX_TOKEN) {
        processStateComponent = <SellIndexTokenForm />
    }

    if (props.start_aprove) {
        let loading = true
        let color = '#23dcd5'
        buyIndexSteps = <React.Fragment>
                        <BuyIndexTokensSteps /> 
                        <DotLoader color={color} loading={loading} css={override} size={150} />
                        </React.Fragment>
        
    } 

    return (
        <div>
            <div>
              {buyIndexSteps}
            </div>
           <div className="tokens-container">
            
            <div className="left-list">
                {processStateComponent}
            </div>
            
            <div className="right-list">
            {tokensOfIndexToken}
            </div>

        </div> 
        </div>
    )
}

const mapStatToProps = (state) => ({
    processState: state.buyTokensReducer.buyTokenProcessState,
    processStateSell: state.sellIndexTokenReducer.sellTokenProcessState,
    start_aprove: state.buyTokensReducer.start_aprove,
    buyindex_end: state.buyTokensReducer.buyindex_end
})

export default connect(mapStatToProps,null)(investmentPage)
