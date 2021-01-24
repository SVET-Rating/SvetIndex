import React from 'react';
//  import Fragment from 'react-fragment';
import {connect} from 'react-redux';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';

const TokensInIndexTokenListItem = (props) => {
    //get active index token from list
        if (props.indexList === undefined) {
            return <div><li className="right-list-item"><p>Tokens are absent !</p></li></div>
        }  else if (props.indexList.length == 0 ) {
            return <div><li className="right-list-item"><p>Token data loading...</p></li></div>
        }        
        else {
        props.tokens(props.indexList);
        var getTokensByActiveIndexToken = props.indexList.map((item,key) => {
            return (
            <li className="right-list-item" style={{showBox:'none'}}>
            <p>{item.name} <br /> <br />
            {item.addrActive}</p> 
            <p>{item.symbol}</p>
            <p>{item.amount /10**18}</p>
            <i className="fa fa-question-circle"></i>                  
            </li>
            )
        });
        }   
                    
        return (
            <div>{getTokensByActiveIndexToken}</div>
        )
    
}

const getActivesList = (addressT,state) => {
    if (addressT === "") {
        return undefined
    }
    const Alc = getContract(state, 'IndexToken', addressT)
    var Al=Alc.fn.getActivesList();

    return Al;
}

const mapStateToProps = (state) => ({
   // indexList: getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress).fn.getActivesList()

     indexList: getActivesList(state.indexTokenReducer.activeToken.tokenAddress, state)
    //return {indexList: state.indexTokenTokens.tokens }
    
});

const mapDispatchToProps = dispatch => {
   return {
    tokens: (tokens) => dispatch(getTokensByIndex(tokens))
   } 
}

export default connect(mapStateToProps,mapDispatchToProps)(TokensInIndexTokenListItem)


