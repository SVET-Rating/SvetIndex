/* eslint-disable react/no-typos */
import React from 'react';
import { connect } from 'react-redux';
import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList';
import buySvetPaymentMethods from '../components/buyTokens/buySvetPaymentMethods';


const investmentPage = (props) => {
    return (
        <div>
           <div className="tokens-container">
            
            <div className="left-list">
                <buySvetPaymentMethods />
            </div>
            
            <div className="right-list">
            <TokensInIndexTokenList />
            </div>

        </div> 
        </div>
    )
}

const mapStatToProps = (state) => ({
    processState: state.buyTokensReducer.processState
})

export default connect(mapStatToProps,null)(investmentPage)
