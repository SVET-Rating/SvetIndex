import React from 'react';
import { connect } from 'react-redux';
import {etherToSvetTokens,changeEtherForBuyAmount}  from '../../ethvtx_config/actions/buySvetTokenAction';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";

const useStyles = makeStyles({
    button: {
      marginRight: '10px',
      color: "green"
    }});

 const SvetPaymentMethodsForm = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        BUY SVET TOKENS
                    </p>
                    <p>
                        INPUT AMOUNT OF {props.paymentMethod}
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
                <div className="svet-token-payment-form">
    <p>You selected {props.paymentMethod} like payment method</p>
                <div className="svet-token-payment-form-input">
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT OF {props.paymentMethod}</p>
                    <TextField id="outlined-basic" label="INPUT AMOUNT" variant="outlined" value={props.etherAmount} 
                    onChange={(e) => {props.buySvetTokenEtherAmount(e)}}/>
                </div>
                  
                <Button variant="outlined" className={classes.button}
                onClick={(e)=>{props.buySvetTokens(props.index2swap,props.etherAmount,props.currentAddress)}}>
                    BUY TOKENS</Button>
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
  var fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap');
  return fnIndex2swap;
}
const mapStateToProps = (state) => {
    return {
        paymentMethod: state.buyTokensReducer.buySvetTokenMethod,
        svetTokenPrice: getSvetTokenPrice(state),
        etherAmount: state.buyTokensReducer.etherAmount,
        index2swap: getIndex2swap(state),
        currentAddress: state.vtxconfig.coinbase
        
    }
}


const mapStateToDispatch = dispatch => {
   return {
    resetToInvestment: (e) => dispatch(resetAction(e)),
    buySvetTokenEtherAmount:(e) => dispatch(changeEtherForBuyAmount(e.target.value)),
    buySvetTokens:(index2swap,etherAmount,currentAddress) => dispatch(etherToSvetTokens(index2swap,etherAmount,currentAddress))
   }
}

export default connect(mapStateToProps, mapStateToDispatch)(SvetPaymentMethodsForm)