import {React,Fragment} from 'react';
import {connect} from 'react-redux';

const TokensInIndexTokenListItem = (props) => {
    //get active index token from list
    if (props.indexList.length === 0) {
        return <Fragment><li className="right-list-item"><p>Tokens are absent !</p></li></Fragment>
    } else {
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


const mapStateToProps = (state) => {
    
    return {indexList: state.indexTokenTokens.tokens }
}

export default connect(mapStateToProps,null)(TokensInIndexTokenListItem)


