import React from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import indexTokenSelect from '../redux/actions/indexTokenSelect'


const IndexTokensListItem =  (props) => {
    console.log(props.indexList)
   
    
    const indexJSXList = props.indexList.map((item,key) => {
        
        
        
        return (<li className="left-list-item" id={item.id} style={!item.active ? {boxShadow:'none'}:{}}>
                        
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
}
const mapStateToProps = (state) => {
    const {indexTokensList} = state;
    return {indexList: indexTokensList.indexTokensList}
}

const mapDispatchToProps = dispatch => ({
    changeActiveElement: (e) => dispatch(indexTokenSelect(e.target.parentElement.id)),
  })

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
