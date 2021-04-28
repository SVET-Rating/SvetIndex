import React from 'react';
import { connect } from 'react-redux';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import {sellIndexTokenAction, sellIndexTokenAmount } from '../../ethvtx_config/actions/sellIndexTokenAction';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
    button: {
      marginRight: '10px',
      color: "green"
    }});
    
const sellIndexTokens = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        YOU ARE GOING TO SELL ( {props.indexTokenName} )
                    </p>
                </div>
                
                <div style={{textAlign:'center'}}>
                <Button variant="outlined" className={classes.button}
                        style={props.enoughSvetTokensForBuy ? {display:'none'}:{}}
                        onClick={(e) => {
                            props.resetToInvestment(e);
                            return <InvestmentPage />;
                          }}
                        >GO BACK</Button>
                </div>
                <div className="svet-token-payment-form">
                    <p>
                        GAS PRICE: { props.gasPrice }
                    </p>
                    <p>
                        GAS AMOUNT: { props.gasAmount }
                    </p>
                    <p>YOU HAVE: {props.indexTokenBalance} OF {props.indexTokenName}</p>
                <div className="svet-token-payment-form-input">
                    
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT: </p>
                    <TextField id="outlined-basic" label="INPUT AMOUNT" variant="outlined" value={props.indexTokensAmountForSell}
                    onChange={(e) => {props.sellIndexTokenAmount(e)}}
                    />
                </div>
                
                    <div style={props.indexTokensAmountForSell === ""?{display:'none'}:{}}>
                    <Button variant="outlined" className={classes.button}
                        
                        onClick={(e) => {props.sellIndexTokenAction(props.sellIndexTokensContract,
                                                              props.indexTokensAmountForSell,
                                                              props.indexTokenAddress,
                                                              props.currentAddress,
                                                              props.indexTokenContract)}}
                        >SELL</Button>
                       
                </div>
            </div>

        </div> 
    )
}

const getIndex2swap = (state) => {
    const fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap');
    //let amount_in_wei = web3.utils.toBN(_amount)
    //const fN = fnIndex2swap._contract.methods.buyIndexforSvetEth
    //(web3.utils.toWei(amount_in_wei), _address).send({from: state.vtxconfig.coinbase});
    return fnIndex2swap;
  }

  const getIndexGasAmout = (state) => {
  
    const actList = getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress).fn.getActivesList();
    
    if (actList == undefined) {
        return actList;
    } else {
      const gasAmount = Math.round ((actList.length * 161387 + 44160 + 52010)*1.02);
      return gasAmount;
    }
  }  

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
        indexTokenAddress:state.indexTokenReducer.activeToken.tokenAddress,
        indexTokenBalance: state.indexTokenReducer.activeToken.indexTokenBalance,
        sellIndexTokensContract: getIndex2swap(state),
        currentAddress: state.vtxconfig.coinbase,
        indexTokensAmountForSell: state.sellIndexTokenReducer.indexTokensAmountForSell,
        indexTokenContract: getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress),
        gasPrice: state.buyTokensReducer.gasPrice,// web3.eth.getGasPrice(),
        gasAmount: getIndexGasAmout(state)

    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetToInvestment: (e) => dispatch(resetAction(e)),
        sellIndexTokenAction: (sellIndexTokensContract,
                               indexTokensAmountForSell,
                               indexTokenAddress,
                                currentAddress,indexTokenContract) => dispatch(sellIndexTokenAction(sellIndexTokensContract,
                                    indexTokensAmountForSell,
                                    indexTokenAddress,
                                     currentAddress,indexTokenContract)),
                                     sellIndexTokenAmount: (e) => dispatch(sellIndexTokenAmount(e.target.value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(sellIndexTokens);