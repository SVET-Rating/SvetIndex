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
        color: 'white',
        marginLeft: '20px',
        backgroundColor: '#119a1199',
        border: '1px solid',
        minWidth: '11rem',
        borderRadius: '2rem',
        fontSize: '3rem',
        '&:hover': {
            backgroundColor: '#9a8f11b0',
            color: '#FFF'
           }
    }});
    
const sellIndexTokens = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        FOR SELL: ( {props.indexTokenName} )
                    </p>
                </div>
                
                <div style={{textAlign:'center'}}>
                
                <div className="svet-token-payment-form">
                    <p>
                        GAS PRICE (gwei): <span className="number_left">{ props.gasPrice }</span>
                    </p>
                    <p>
                        GAS AMOUNT: <span className="number_left">{ props.gasAmount }</span>
                    </p>
                    <p>APPROX. COST of TRANZACTION (ETH):<span className="number_left">{props.gasPrice * props.gasAmount / 1000000000}</span> </p>
                    <p>FOR BLOCK: <span className="number_left">{props.curBlock}</span></p> 
                    <p>YOU HAVE ({props.indexTokenName}):
                    <span className="numbers number_left"> 
                       {props.indexTokenBalance.toFixed(4)}
                    </span> </p>
                <div className="svet-token-payment-form-input">
                    
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT: </p>
                    <TextField id="outlined-basic" label="INPUT AMOUNT" variant="outlined" value={props.indexTokensAmountForSell}
                    onChange={(e) => {props.sellIndexTokenAmount(e)}}
                    />
                </div>
                
                    <div>
                    <Button variant="outlined" className={classes.button}
                        style={props.enoughSvetTokensForBuy ? {display:'none'}:{}}
                        onClick={(e) => {
                            props.resetToInvestment(e);
                           
                          }}
                        >GO BACK</Button>
                    
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
        gasAmount: getIndexGasAmout(state),
        curBlock: state.blocks.current_height

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