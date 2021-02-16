import React from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import startBuyIndexTokens from '../../ethvtx_config/actions/startToBuyIndexTokens';
import startSellToken from '../../ethvtx_config/actions/startSellIndexTokens';

//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';


const IndexTokensListItem =  (props) => {
   // console.log(props.indexList)
  
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {

            var styleSelect = {};
            var investStyle = {};

            if (item.addr !== props.activeToken.tokenAddress) {
               styleSelect = {boxShadow:'none'}
               investStyle = {display:'none'}
            }


           
            
            return (<li className="left-list-item" id={item.addr} style={styleSelect}>
                        
        <i className="fa fa-question-circle"></i>
    
    
        <p onClick={(e) => {props.changeActiveElement(e,item.name,item.balance/1000000000000000000)}}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.name}
            <br />
            {item.addr}
        </p>
        
        <p>
            {item.price}
        </p>
        <p style={{ minWidth: '1rem' }}>
            {/* VERY GOOD INDEX TOKEN */}
            {item.balance/1000000000000000000}
        </p>
    
        
        <button className="invest" onClick={() => props.startBuyToken(props.svetTokensAmount,props.svetTokenAddress)
            } style={investStyle}>INVEST</button>
        <br/>

        <button className="invest" onClick={() => props.startSellToken()} style={investStyle}>Sell</button>
        
    
     </li>)
    });
    
        return (
        
                <div>{indexJSXList}</div>
        )
    } else {
        return ("Data loading...")
    }
    
}


const getIndexPriceInSvet = (indexTokenAddress,state) => {
    var tokenPrice;
    let svetTokenAddress = getContract(state, 'Exchange', '@exchange').fn.getBA()
    if (svetTokenAddress == undefined) {
        return undefined
    }
    let tokensList = getContract(state, 'IndexToken', indexTokenAddress).fn.getActivesList()
    if (tokensList == undefined) {
        return undefined
    }
    var tokensPrice = tokensList.map((item,key) => {

        var tokenPriceCurrent = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item[0])
        if (tokenPriceCurrent === undefined) {
            return tokenPriceCurrent;
        }
        tokenPrice = tokenPriceCurrent/10**item[2]*item[1]/10000
        ///10^item[4]
        return tokenPrice
    });
    var svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(svetTokenAddress)
    if (svetTokenPrice === undefined) {
        return svetTokenPrice;
    }
    if (tokensPrice.indexOf(undefined) !== -1) {
        return undefined;
    }
    
    var resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0)
    return resultIndexTokenPriceUSD/(svetTokenPrice/10**18)
    
}


const indexListWithBalance = (state) => {
    const indexTokensList = getContract(state, 'IndexStorage', '@indexstorage').fn.indexList();
    if (indexTokensList != undefined) {
        let resultList = indexTokensList.map((item,key) => {
            let currentBalance = getContract(state, 'IndexToken', item.addr).fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress)
            //let currentPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item.addr)
            let currentPrice = getIndexPriceInSvet(item.addr, state);
            if (currentBalance == undefined || currentPrice == undefined) {
                return undefined
            } else {
                return  {
                    addr: item.addr,
                    name: item.name,
                    balance: currentBalance,
                    price: currentPrice
                    //._contract.methods.balanceOf(state.contracts.web3.currentProvider.selectedAddress)
                }
            }
            
         })
        if (resultList.indexOf(undefined) == -1 ) {
            return resultList
        } else {
            return undefined
        }
         
    } else {
        return undefined
    }
    
}


const mapStateToProps = (state) => ({
    indexList: indexListWithBalance(state),
    contractsList: getContractList(state),
    activeToken: state.indexTokenReducer.activeToken,
    svetTokensAmount: getContract(state, 'ERC20', '@svettoken').fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress)/10**18,
    svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
    //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});



const mapDispatchToProps = dispatch => {
    return {
    changeActiveElement: (e,indexTokenName,indexTokenBalance) => dispatch(indexTokenSelect(e.target.parentElement.id,indexTokenName,indexTokenBalance)),
    startBuyToken: (svetTokensAmount,svetTokenAddress) => dispatch(startBuyIndexTokens(svetTokensAmount,svetTokenAddress)),
    startSellToken: () => dispatch(startSellToken())
  }}



export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
