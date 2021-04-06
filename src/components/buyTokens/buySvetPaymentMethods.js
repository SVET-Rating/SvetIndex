import React from 'react';
import { connect } from 'react-redux';
import {ETHER, FIAT_MONEY, DAI, BITCOIN} from '../../ethvtx_config/paymentMethod/paymentMethodType';
import buySvetTokenMethodSelectAction from '../../ethvtx_config/actions/buySvetTokensMethodSelect';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";

const useStyles = makeStyles({
    button: {
      marginRight: '10px',
      color: "green"
    }});

 const SvetPaymentMethods = (props) => {
    const classes = useStyles();
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
                <div style={{textAlign:'center'}}>
                <Button variant="outlined" className={classes.button}
                        style={props.enoughSvetTokensForBuy ? {display:'none'}:{}}
                        onClick={(e) => {
                            props.resetToInvestment(e);
                            
                          }}
                        >GO BACK</Button>
                </div>
                <div className="svet-token-payment-methods">
                <Button variant="outlined" className={classes.button} disabled
                onClick={()=>props.buySvetTokenFiat(FIAT_MONEY)}>FIAT MONEY</Button>
                <Button variant="outlined" className={classes.button} 
                onClick={()=>props.buySvetTokenFiat(ETHER)}>ETHER</Button>
                <Button variant="outlined" className={classes.button} disabled
                onClick={()=>props.buySvetTokenFiat(BITCOIN)}>BITCOIN</Button>
                <Button variant="outlined" className={classes.button} disabled
                onClick={()=>props.buySvetTokenFiat(DAI)}>DAI</Button>
                    </div>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
   return {
      resetToInvestment: (e) => dispatch(resetAction(e)),
      buySvetTokenFiat: (payment_method) => dispatch(buySvetTokenMethodSelectAction(payment_method))
   }
}
export default connect(null, mapDispatchToProps)(SvetPaymentMethods)