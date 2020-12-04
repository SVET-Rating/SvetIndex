import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';


const IndexTokensListItem =  (props) => {
   // console.log(props.indexList)
   
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {
            
            return (
                <li key={key}>{item}</li>
                
            )
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
    contractsList: getContractList(state)
});


const mapDispatchToProps = dispatch => ({
    changeActiveElement: (e) => dispatch(indexTokenSelect(e.target.parentElement.id)),
  })

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
