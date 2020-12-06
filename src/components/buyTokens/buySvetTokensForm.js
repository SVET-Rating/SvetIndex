import React from 'react';
import { connect } from 'react-redux';

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
                    <input type="text" name="amount_of_fiat" />
                </div>

                <button className="payment-method" >BUY TOKENS</button>
                </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        paymentMethod: state.buyTokensReducer.buySvetTokenMethod
    }
}

export default connect(mapStateToProps, null)(SvetPaymentMethodsForm)