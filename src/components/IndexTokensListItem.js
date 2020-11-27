import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../redux/actions/indexTokenSelect';
import { IndexContractLoader } from './IndexContractLoader';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';


const IndexTokensListItem =  (props) => {
    console.log(props.indexList)
   
    
    const indexJSXList = props.indexstorage_indexlist.map((item,key) => {
        
        return (
            <IndexContractLoader address = {item.address}/>
        )
    });
    return (
       
            <Fragment>{indexJSXList}</Fragment>
    )
}
/*
const mapStateToProps = (state) => {
    const {indexTokensList} = state;
    return {indexList: indexTokensList.indexTokensList}
}
*/

//const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);


const mapStateToProps = (state) => ({
    
    indexstorage_indexlist: getContract(state, 'IndexStorage', '@indexstorage').fn.indexList()
});


const mapDispatchToProps = dispatch => ({
    changeActiveElement: (e) => dispatch(indexTokenSelect(e.target.parentElement.id)),
  })

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
