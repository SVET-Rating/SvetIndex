import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import startBuyIndexTokens from '../../ethvtx_config/actions/startToBuyIndexTokens';
import startSellToken from '../../ethvtx_config/actions/startSellIndexTokens';
import IndexTokens from '../indexTokenTokens/TokensInIndexTokenList';
//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';


const IndexTokensListItem =  (props) => {
   // console.log(props.indexList)
   const [matches, setMatches] = useState(false);
    
    useEffect(() => {
       const media = window.matchMedia('(max-width: 600px)');
       if (media.matches !== matches) {
        setMatches(media.matches);
        console.log('TEST MEDIA QUERY',media.matches)
      }
      
    }, [matches])
  
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {

            var styleSelect = {};
            var investStyle = {};
            var indexListcomponent = '';

            if (item.addr !== props.activeToken.tokenAddress) {
               styleSelect = {boxShadow:'none'}
               investStyle = {display:'none'}
               indexListcomponent = ''
            } else {
               if (matches) {
                indexListcomponent = <div><h3>Tokens of Index Token</h3><IndexTokens /></div>
               }
            }


           
            
            return (
            <li className="left-list-item index-li" id={item.addr} style={styleSelect}
            onClick={(e) => {
                if (matches) {
                    setTimeout(function(){
                        let objControl=document.getElementById(item.addr);
                        objControl.scrollIntoView({behavior: "smooth"});
                       },500);
                }
                
                props.changeActiveElement(item.addr,item.name,item.balance/1000000000000000000)
            }}
            >
                        
        {/* <i className="fa fa-question-circle"></i> */}
    
        
        <div className="token_info">
            <p>{item.name}</p>
            <p> Price: ${item.price.toFixed(4)}</p>
            <p style={{ minWidth: '1rem' }}> Balance: {(item.balance/1000000000000000000).toFixed(4)}</p>
        </div>
        <div className="address_container" >
            <span style={{'fontSize':'65%'}} className="address_in_list">{matches}
            {item.addr} </span>
        </div>
        <div className="buttons_container">
            <p>
            <button className="invest" onClick={() => props.startBuyToken(props.svetTokensAmount,props.svetTokenAddress)
                } style={investStyle}>INVEST</button>
            <button className="invest" onClick={() => props.startSellToken()} style={investStyle}>Sell</button>
            </p>
        </div>
        
        {indexListcomponent}
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
    changeActiveElement: (e,indexTokenName,indexTokenBalance) => dispatch(indexTokenSelect(e,indexTokenName,indexTokenBalance)),
    startBuyToken: (svetTokensAmount,svetTokenAddress) => dispatch(startBuyIndexTokens(svetTokensAmount,svetTokenAddress)),
    startSellToken: () => dispatch(startSellToken())
  }}



export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
