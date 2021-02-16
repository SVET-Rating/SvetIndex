import React from 'react';
import { connect } from 'react-redux';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import {sellIndexTokenAction, sellIndexTokenAmount } from '../../ethvtx_config/actions/sellIndexTokenAction';


const sellIndexTokens = (props) => {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        YOU ARE GOING TO SELL ( {props.indexTokenName} )
                    </p>
                </div>
                <div className="svet-token-payment-form">
                    <p>YOU HAVE: {props.indexTokenBalance} OF {props.indexTokenName}</p>
                <div className="svet-token-payment-form-input">
                    
                    <p style={{fontSize: '0.9rem'}}>INPUT AMOUNT: </p>
                    <input type="text" name="amount_of_index_tokens" value={props.indexTokensAmountForSell}
                    onChange={(e) => {props.sellIndexTokenAmount(e)}}
                    />
                </div>
                
                    <div style={props.indexTokensAmountForSell === ""?{display:'none'}:{}}>
                        <button className="payment-method" 
                        
                        onClick={(e) => {props.sellIndexTokenAction(props.sellIndexTokensContract,
                                                              props.indexTokensAmountForSell,
                                                              props.indexTokenAddress,
                                                              props.currentAddress,
                                                              props.indexTokenContract)}}
                        >SELL</button>
                       
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

const mapStateToProps = (state) => {
    return {
        indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
        indexTokenAddress:state.indexTokenReducer.activeToken.tokenAddress,
        indexTokenBalance: state.indexTokenReducer.activeToken.indexTokenBalance,
        sellIndexTokensContract: getIndex2swap(state),
        currentAddress: state.vtxconfig.coinbase,
        indexTokensAmountForSell: state.sellIndexTokenReducer.indexTokensAmountForSell,
        indexTokenContract: getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress)

    }
}

const mapDispatchToProps = dispatch => {
    return {
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