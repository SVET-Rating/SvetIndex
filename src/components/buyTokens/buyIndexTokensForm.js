import React from 'react';
import { connect } from 'react-redux';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import  checkSvetTokensForBuyIndexTokensAction  from '../../ethvtx_config/actions/checkIndexTokenAmountAction';
import svetTokensBuyProcessStart from '../../ethvtx_config/actions/goToSvetTokenMethodPayment';
import formBuyIndexTokens from '../../ethvtx_config/actions/buyIndexTokensAction';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    button: {
      marginRight: '10px',
      color: 'white',
    backgroundColor: '#119a1199',
    border: '1px solid',
    minWidth: '7rem',
    '&:hover': {
        backgroundColor: '#119a1199',
        color: '#FFF'
       }
    }
});
    
const IndexTokenPaymentForm = (props) => {
    const classes = useStyles();
    
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        {props.indexTokenName}
                    </p>
                   
                    
                </div>
                
                <div className="svet-token-payment-form">
                    <p>PRICE (SVET): {props.indexTokenPrice}</p>
                    <p>YOUR WALLET: {props.svetTokensAmount} SVETs</p>
                    <p>MAX TO BUY: {props.svetTokensAmount/props.indexTokenPrice}</p>
                <div className="svet-token-payment-form-input" 
                style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {}:{display:'none'}} >
                    <TextField id="outlined-basic" label="AMOUNT IN SVET" variant="outlined"
                    
                    value={props.indexTokensAmount}
                    onChange={(e) => {props.addIndexTokenAmount(e.target.value, props.indexTokenPrice,props.svetTokensAmount)}}
                    />
                </div>
                   <div >
                  
                <Button variant="outlined" className={classes.button}
                        
                        onClick={(e) => {
                            props.resetToInvestment(e);
                            
                          }}
                        >GO BACK</Button>
                
                    <Button variant="outlined" className={classes.button}
                        style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {}:{display:'none'}}
                        onClick={(e) => {props.buyIndexTokens(props.buyIndexTokensContract,
                                                              props.indexTokensAmount,
                                                              props.indexTokenAddress,
                                                              props.currentAddress,
                                                              props.svetToken,
                                                              )}}
                        >BUY</Button>
                       <Button variant="outlined" className={classes.button}
                        style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {display:'none'}:{}}
                        onClick={(e) => {props.buySvetTokensMethodSelect(e)}}
                        >BUY SVET TOKENS</Button>
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
        tokenPrice = tokenPriceCurrent/10**item[2]*item[1]/10000
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

const getIndex2swap = (state) => {
    const fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap');
    //let amount_in_wei = web3.utils.toBN(_amount)
    //const fN = fnIndex2swap._contract.methods.buyIndexforSvetEth
    //(web3.utils.toWei(amount_in_wei), _address).send({from: state.vtxconfig.coinbase});
    return fnIndex2swap;
  }

const getEventSvetToken = (state) => {
    const contract = getContract(state, 'ERC20', '@svettoken')
    const events = contract.events.Approval()
    return events
}

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
        indexTokenAddress:state.indexTokenReducer.activeToken.tokenAddress,
        enoughSvetTokensForBuy: state.buyTokensReducer.enoughSvetTokensForBuy,
        indexTokenPrice: getIndexPriceInSvet(state.indexTokenTokens.tokens,state),
        svetTokensAmount: state.buyTokensReducer.svetTokens.amount,
        buyIndexTokensContract: getIndex2swap(state),
        indexTokensAmount: state.buyTokensReducer.indexTokensAmount,
        currentAddress: state.vtxconfig.coinbase,
        svetToken:getContract(state, 'ERC20', '@svettoken'),
        svetTokenAprovalEvent: getEventSvetToken(state)
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetToInvestment: (e) => dispatch(resetAction(e)),
        buySvetTokensMethodSelect:(e) => dispatch(svetTokensBuyProcessStart(e)),
        addIndexTokenAmount: (e,indexTokenPrice,svetTokensAmount) => dispatch(checkSvetTokensForBuyIndexTokensAction(e, indexTokenPrice, svetTokensAmount)),
        buyIndexTokens: (ITokContract, ITAmount, ITAddress,currentAddress, svetToken) => dispatch(formBuyIndexTokens(ITokContract, ITAmount, ITAddress, currentAddress, svetToken))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokenPaymentForm);

