import React from 'react';
import { connect } from 'react-redux';
import {etherToSvetTokens,changeEtherForBuyAmount}  from '../../ethvtx_config/actions/buySvetTokenAction';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

 const SvetPaymentMethodsForm = (props) => {

    return (
        <div>
            <div className="left-list-header">
                    <p>
                        BUY SVET TOKENS
                    </p>
                    <p>
                        INPUT AMOUNT OF TOKENS
                    </p>
                    
                </div>
                <div className="svet-token-payment-form">
    <p>You selected {props.paymentMethod} like payment method</p>
                <div className="svet-token-payment-form-input">
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT OF {props.paymentMethod}</p>
                    <input type="text" name="amount_of_fiat" value={props.etherAmount} 
                    onChange={(e) => {props.buySvetTokenEtherAmount(e)}}/>
                </div>
                  
                <button className="payment-method" 
                onClick={(e)=>{props.buySvetTokens(props.index2swap,props.etherAmount)}}>BUY TOKENS</button>
                </div>

        </div>
    )
}

const buySvetByEther = (index2swap, etherAmount) => {
    if (index2swap != undefined) {
        index2swap({'value':etherAmount})
    }
}


const getSvetTokenPrice = (state) => {
    var svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(state.buyTokensReducer.svetTokens.address)
    var checkOracle = getContract(state, 'OraclePrice', '@oracleprice');
    console.log(checkOracle)
    return svetTokenPrice;
}
const getIndex2swap = (state) => {
  var fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap').fn.buySvet4Eth;
  return fnIndex2swap;
}
const mapStateToProps = (state) => {
    return {
        paymentMethod: state.buyTokensReducer.buySvetTokenMethod,
        svetTokenPrice: getSvetTokenPrice(state),
        etherAmount: state.buyTokensReducer.etherAmount,
        index2swap: getIndex2swap(state)
        
    }
}


const mapStateToDispatch = dispatch => {
   return {
    buySvetTokenEtherAmount:(e) => dispatch(changeEtherForBuyAmount(e.target.value)),
    buySvetTokens:(index2swap,etherAmount) => dispatch(etherToSvetTokens(index2swap,etherAmount))
   }
}

export default connect(mapStateToProps, mapStateToDispatch)(SvetPaymentMethodsForm)