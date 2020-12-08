import React from 'react';
import { connect } from 'react-redux';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

const IndexTokenPaymentForm = (props) => {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        YOU ARE GOING TO BUY ( {props.indexTokenName} )
                    </p>
                    <p>
                        YOU HAVE TO PAY SVET TOKENS FOR INVESTMENT
                    </p>
                    
                </div>
                <div className="svet-token-payment-form">
                    <p>INDEX TOKEN PRICE: {props.indexTokenPrice}</p>
                <div className="svet-token-payment-form-input">
                    
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT </p>
                    <input type="text" name="amount_of_svet_tokens" 
                    onChange={(e) => props.addIndexTokenAmount(e)}
                    />
                </div>

                <button className="payment-method" 
                style={props.enoughSvetTokensForBuy ? {}:{display:'none'}}>INVEST</button>
                <button className="payment-method" 
                style={props.enoughSvetTokensForBuy ? {display:'none'}:{}}>BUY SVET TOKENS</button>
                </div>

        </div> 
    );
}


const getIndexPriceInSvet = (tokens,state) => {
    var tokenPrice;

    var tokensPrice = tokens.map((item,key) => {

        var tokenPriceCurrent = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item[0])
        if (tokenPriceCurrent === undefined) {
            return tokenPriceCurrent;
        }
        tokenPrice = tokenPriceCurrent/10**item[2]*item[1]/10**item[2]
        ///10^item[4]
        return tokenPrice
    });
    if (tokensPrice.indexOf(undefined) !== -1) {
        return undefined;
    }
    var svetTokenAddress = getContract(state, 'Exchange', '@exchange').fn.getBA();

    return tokensPrice.reduce((a, b) => a + b, 0)
    
}

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
        enoughSvetTokensForBuy: state.buyTokensReducer.enoughSvetTokensForBuy,
        indexTokenPrice: getIndexPriceInSvet(state.indexTokenTokens.tokens,state)
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addIndexTokenAmount: (e) => dispatch(checkIndexTokenAmountAction(e.targget.value))
//     }
// }

export default connect(mapStateToProps,null)(IndexTokenPaymentForm);

