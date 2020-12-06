import React from 'react';
import { connect } from 'react-redux';
import {ETHER, FIAT_MONEY, DAI, BITCOIN} from '../../ethvtx_config/paymentMethod/paymentMethodType';
import buySvetTokenMethodSelectAction from '../../ethvtx_config/actions/buySvetTokensMethodSelect';

 const SvetPaymentMethods = (props) => {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        BUY SVET TOKENS
                    </p>
                    <p>
                        PLEAS SELECT METHOD OF PAYMENT
                    </p>
                </div>
                <div className="svet-token-payment-methods">
                <button className="payment-method" onClick={()=>props.buySvetTokenFiat(FIAT_MONEY)}>FIAT MONEY</button>
                <button className="payment-method" onClick={()=>props.buySvetTokenFiat(ETHER)}>ETHER</button>
                <button className="payment-method" onClick={()=>props.buySvetTokenFiat(BITCOIN)}>BITCOIN</button>
                <button className="payment-method" onClick={()=>props.buySvetTokenFiat(DAI)}>DAI</button>
                    </div>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
   return {
      buySvetTokenFiat: (payment_method) => dispatch(buySvetTokenMethodSelectAction(payment_method))
   }
}
export default connect(null, mapDispatchToProps)(SvetPaymentMethods)