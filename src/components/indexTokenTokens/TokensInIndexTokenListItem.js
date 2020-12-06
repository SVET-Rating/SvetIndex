import {React,Fragment} from 'react';
import {connect} from 'react-redux';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';

const TokensInIndexTokenListItem = (props) => {
    //get active index token from list
        if (props.indexList === undefined) {
            return <Fragment><li className="right-list-item"><p>Tokens are absent !</p></li></Fragment>
        } else {
        props.tokens(props.indexList);
        var getTokensByActiveIndexToken = props.indexList.map((item,key) => {
            return (
            <li className="right-list-item" style={{showBox:'none'}}>
            <p>{item.name}</p>
            <p>{item.amount}</p>
            <p>{item.symbol}</p>
            <i className="fa fa-question-circle"></i>                  
            </li>
            )
        });
        }   
                    
        return (
            <Fragment>{getTokensByActiveIndexToken}</Fragment>
        )
    
}

const getIndexList = (address,state) => {
    if (address === "") {
        return undefined
    }
    return getContract(state, 'IndexToken', address).fn.getActivesList()
}

const mapStateToProps = (state) => {
    return {indexList: getIndexList(state.indexTokenReducer.activeToken.tokenAddress, state)}
    //return {indexList: state.indexTokenTokens.tokens }
    
}

const mapDispatchToProps = dispatch => {
   return {
    tokens: (tokens) => dispatch(getTokensByIndex(tokens))
   } 
}

export default connect(mapStateToProps,mapDispatchToProps)(TokensInIndexTokenListItem)


