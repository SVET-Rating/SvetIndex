import {React,Fragment} from 'react';
import {connect} from 'react-redux';

const TokensInIndexTokenListItem = (props) => {
    //get active index token from list
    const activeIndexToken = props.indexList.filter(listItem => listItem.active)
    if (activeIndexToken[0].tokens === undefined) {
        return <Fragment><li className="right-list-item"><p>Tokens are absent !</p></li></Fragment>
    } else {
    var getTokensByActiveIndexToken = activeIndexToken[0].tokens.map((item,key) => {
        return (
           <li className="right-list-item">
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
    const {indexTokensList} = state;
    return {indexList: indexTokensList.indexTokensList}
}

export default connect(mapStateToProps,null)(TokensInIndexTokenListItem)


