/* eslint-disable react/no-typos */
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList';
import SvetPaymentMethods from '../components/buyTokens/buySvetPaymentMethods';
import SvetPaymentMethodsForm from '../components/buyTokens/buySvetTokensForm';
import IndexTokenPaymentForm from '../components/buyTokens/buyIndexTokensForm';
import SellIndexTokenForm from '../components/sellTokens/sellIndexTokensForm';

import {SELECT_INDEX_TOKEN, 
    BUY_SVET_PAYMENT_METHOD, 
    BUY_SVET_PAYMENT_FORM,
    BUY_INDEX_TOKEN} from '../ethvtx_config/processStates/buyTokenProcessStates';
    import { SELECT_INDEX_TOKEN_SELL, SELL_INDEX_TOKEN } from '../ethvtx_config/processStates/sellTokenProcessStates';


const investmentPage = (props) => {

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
    return (
        <div>
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
    processStateSell: state.sellIndexTokenReducer.sellTokenProcessState
})

export default connect(mapStatToProps,null)(investmentPage)
