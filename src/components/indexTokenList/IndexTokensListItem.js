import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';
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
    
    
        <p onClick={props.changeActiveElement}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.name}
        </p>
        <p style={{ minWidth: '1rem' }}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.balance}
        </p>
    
    
        <button className="invest">INVEST</button>
    
     </li>)
    });
    
        return (
        
                <Fragment>{indexJSXList}</Fragment>
        )
    } else {
        return ("Data loading...")
    }
    
}



// const mapStateToProps = (state) => {
//     return {indexList: state.indexTokensList}
// }


//const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);


const mapStateToProps = (state) => ({
    indexList: getContract(state, 'IndexStorage', '@indexstorage').fn.indexList(),
    contractsList: getContractList(state),
    activeToken: state.indexTokenReducer.activeToken
});



const mapDispatchToProps = (dispatch) => ({
    changeActiveElement: (e)=> { 
        dispatch(indexTokenSelect(e.target.parentElement.id))
        dispatch(getTokensByIndex(e.target.parentElement.id))}
  })

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
