import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import startBuyIndexTokens from '../../ethvtx_config/actions/startToBuyIndexTokens';

//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';


const IndexTokensListItem =  (props) => {
   // console.log(props.indexList)
  
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {

            var styleSelect = {};

            if (item.addr !== props.activeToken.tokenAddress) {
               styleSelect = {boxShadow:'none'}
            }
            
            return (<li className="left-list-item" id={item.addr} style={styleSelect}>
                        
        <i className="fa fa-question-circle"></i>
    
    
        <p onClick={(e) => {props.changeActiveElement(e,item.name)}}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.name} <br />
            {item.addr}
        </p>
        <p style={{ minWidth: '1rem' }}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.balance}
        </p>
    
    
        <button className="invest" onClick={() => props.startBuyToken(props.svetTokensAmount,props.svetTokenAddress)
            }>INVEST</button>
    
     </li>)
    });
    
        return (
        
                <div>{indexJSXList}</div>
        )
    } else {
        return ("Data loading...")
    }
    
}



const mapStateToProps = (state) => ({
    indexList: getContract(state, 'IndexStorage', '@indexstorage').fn.indexList(),
    contractsList: getContractList(state),
    activeToken: state.indexTokenReducer.activeToken,
    svetTokensAmount: getContract(state, 'ERC20', '@svettoken').fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress)/10**18,
    svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
    //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});



const mapDispatchToProps = dispatch => {
    return {
    changeActiveElement: (e,indexTokenName) => dispatch(indexTokenSelect(e.target.parentElement.id,indexTokenName)),
    startBuyToken: (svetTokensAmount,svetTokenAddress) => dispatch(startBuyIndexTokens(svetTokensAmount,svetTokenAddress))
  }}



export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
