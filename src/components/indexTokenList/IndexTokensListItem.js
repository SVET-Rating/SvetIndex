import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import buySvetTokenAction from '../../ethvtx_config/actions/buySvetTokensAction';

//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';


const IndexTokensListItem =  (props) => {
   // console.log(props.indexList)
  
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {

            var styleSelect = {};

            if (item.addr !== props.activeToken) {
               styleSelect = {boxShadow:'none'}
            }
            
            return (<li className="left-list-item" id={item.addr} style={styleSelect}>
                        
        <i className="fa fa-question-circle"></i>
    
    
        <p onClick={(e) => {props.changeActiveElement(e)}}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.name}
        </p>
        <p style={{ minWidth: '1rem' }}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.balance}
        </p>
    
    
        <button className="invest" onClick={() => props.startBuyTokens(props.svetTokensAmount)}>INVEST</button>
    
     </li>)
    });
    
        return (
        
                <Fragment>{indexJSXList}</Fragment>
        )
    } else {
        return ("Data loading...")
    }
    
}



const mapStateToProps = (state) => ({
    indexList: getContract(state, 'IndexStorage', '@indexstorage').fn.indexList(),
    contractsList: getContractList(state),
    activeToken: state.indexTokenReducer.activeToken,
    svetTokensAmount:0
});



const mapDispatchToProps = dispatch => {
    return {
    changeActiveElement: (e) => dispatch(indexTokenSelect(e.target.parentElement.id)),
    startBuyTokens: (svetTokensAmount) => dispatch(buySvetTokenAction(svetTokensAmount))
  }}



export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
