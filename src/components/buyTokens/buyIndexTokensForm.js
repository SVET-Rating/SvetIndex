import React from 'react';
import { connect } from 'react-redux';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import  checkSvetTokensForBuyIndexTokensAction  from '../../ethvtx_config/actions/checkIndexTokenAmountAction';
import svetTokensBuyProcessStart from '../../ethvtx_config/actions/goToSvetTokenMethodPayment';
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
                    <p>INDEX TOKEN PRICE IN SVET TOKENS: {props.indexTokenPrice}</p>
                    <p>YOU HAVE: {props.svetTokensAmount} SVET TOKENS</p>
                    <p>YOU CAN BUY: {props.svetTokensAmount/props.indexTokenPrice}</p>
                <div className="svet-token-payment-form-input">
                    
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT </p>
                    <input type="text" name="amount_of_svet_tokens" 
                    onChange={(e) => {props.addIndexTokenAmount(e,props.indexTokenPrice,props.svetTokensAmount)}}
                    />
                </div>
                    <div style={props.enoughSvetTokensForBuy === undefined?{display:'none'}:{}}>
                        <button className="payment-method" 
                        style={props.enoughSvetTokensForBuy ? {}:{display:'none'}}
                        onClick={(e) => {props.buyIndexTokens(e)}}
                        >INVEST</button>
                        <button className="payment-method" 
                        style={props.enoughSvetTokensForBuy ? {display:'none'}:{}}
                        onClick={(e) => {props.buySvetTokensMethodSelect(e)}}
                        >BUY SVET TOKENS</button>
                </div>
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
    var svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(state.buyTokensReducer.svetTokens.address)
    if (svetTokenPrice === undefined) {
        return svetTokenPrice;
    }
    if (tokensPrice.indexOf(undefined) !== -1) {
        return undefined;
    }
    
    var resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0)
    return resultIndexTokenPriceUSD/(svetTokenPrice/10**18)
    
}

const getIndex2swap = (state, _amount, _address) => {
    const fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap');
    let amount_in_wei = web3.utils.toBN(_amount)
    const fN = fnIndex2swap._contract.methods.buyIndexforSvetEth(web3.utils.toWei(amount_in_wei), _address).send({from: state.vtxconfig.coinbase});
    return fN;
  }

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
        enoughSvetTokensForBuy: state.buyTokensReducer.enoughSvetTokensForBuy,
        indexTokenPrice: getIndexPriceInSvet(state.indexTokenTokens.tokens,state),
        svetTokensAmount: state.buyTokensReducer.svetTokens.amount,
        buyIndexTokens: getIndex2swap(state, state.buyTokensReducer.svetTokens.amount, state.indexTokenReducer.activeToken.tokenAddress)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buySvetTokensMethodSelect:(e) => dispatch(svetTokensBuyProcessStart(e)),
        addIndexTokenAmount: (e,indexTokenPrice,svetTokensAmount) => dispatch(checkSvetTokensForBuyIndexTokensAction(e.target.value, indexTokenPrice, svetTokensAmount))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokenPaymentForm);

