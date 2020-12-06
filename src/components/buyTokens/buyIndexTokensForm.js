import React from 'react';
import { connect } from 'react-redux';


const buyIndexTokensFormComponent = (props) => {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        YOU ARE GOING TO BUY ( TOKENS )
                    </p>
                    <p>
                        YOU HAVE TO PAY SVET TOKENS FOR INVESTMENT
                    </p>
                    
                </div>
                <div className="svet-token-payment-form">
                <div className="svet-token-payment-form-input">
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT OF ( {props.indexTokenName} )</p>
                    <input type="text" name="amount_of_svet_tokens" />
                </div>

                <button className="payment-method" >BUY TOKENS</button>
                </div>

        </div> 
    );
}

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName
    }
}

export default connect(mapStateToProps,null)(buyIndexTokensFormComponent);

