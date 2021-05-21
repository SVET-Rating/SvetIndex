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
import { Jazzicon } from '@ukstv/jazzicon-react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { white } from 'chalk';
//import {readFile}  from 'commonjs fs';
const tokenList = require("../../assets/tokenlist.json");
import { EthAddress } from "rimble-ui";



const useStyles = makeStyles({
    buttonSell: {
      marginRight: '10px',
      color: "white",
      backgroundColor: '#e0101099',
      border: '1px solid',
      minWidth: '11rem',
      borderRadius: '2rem',
      fontSize: '3rem',
      '&:hover': {
        backgroundColor: '#9a8f11b0',
        color: '#FFF'
       }
    },
    buttonBuy: {
        color: 'white',
        backgroundColor: '#119a1199',
        border: '1px solid',
        minWidth: '11rem',
        borderRadius: '2rem',
        fontSize: '3rem',
        '&:hover': {
            backgroundColor: '#9a8f11b0',
            color: '#FFF'
           }
    }
});

const IndexTokensListItem =  (props) => {
    const classes = useStyles();

   // console.log(props.indexList)
   const [matches, setMatches] = useState(false);
   
    useEffect(() => {
       const media = window.matchMedia('(max-width: 600px)');
       if (media.matches !== matches) {
        setMatches(media.matches);
        console.log('TEST MEDIA QUERY',media.matches)
      }
      
    }, [matches])


    const getTokensIcons = (tokens) => {
              /*
                let tokenList;
                readFile('../../../../assets/blockchains/ethereum/tokenlist.json', 'utf8', (err, jsonString) => {
                    if (err) {
                        console.log("Error reading file from disk:", err)
                        return
                    }
                    try {
                        tokenList = JSON.parse(jsonString)

                    }
                    catch(errT) {
                        console.log(errT)
                        return
                      }
                }) */
               return tokens.map((address,key) => {
                    
                    var isExist = tokenList.tokens.findIndex(e => e.address == address.addrActive ) >= 0 ? true : false; 
                        
                    return <div className="icon-item" key={key}>
                    <span>&nbsp;{address.amount/100}&nbsp;%</span>
                    <div style={{ width: '25px', height: '25px', margin:'0 5px' }} id={key}>
                        {isExist&&<img style={{ width: '25px', height: '25px', margin:'0 5px' }} src={'/static/assets/blockchains/ethereum/assets/'+address.addrActive+'/logo.png'}/>}  
                        {!isExist&&<Jazzicon address={address.addrActive} />}
                    </div>
                    <span>{address.symbol}</span>
                    </div>
               } )
                        
    }
  
    if  (props.indexList !== undefined) {
        const indexJSXList = props.indexList.map((item, key) => {

            var styleSelect = {};
            var investStyle = {};
            var indexListcomponent = '';

            if (item.addr !== props.activeToken.tokenAddress) {
               styleSelect = {boxShadow:'none',border:'unset'}
               investStyle = {display:'none'}
               indexListcomponent = ''
            } else {
               styleSelect = {border: '1px dashed #c51f1f'} 
               if (matches) {
                indexListcomponent = <div><h3>Tokens of Index Token</h3><IndexTokens /></div>
               }
            }


           
            
            return (
            <li className="left-list-item index-li" id={item.addr} style={styleSelect} key={key}
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
            <div>
                 
               <div className="index-token-name">
                 <div style={{ width: '25px', height: '25px', margin:'0 5px' }} id={key}>
                  <Jazzicon address={item.addr} />
                 </div>
                   <div className="price">
                       {item.name}
                   </div>
                 </div> 
            </div>
            
            <div>
                <p className="price"> Index Price: {item.price.toFixed(4)} SVT</p>
                <p className="balance numbers" style={{ minWidth: '1rem' }}> Your Index Balance: {(item.balance/1000000000000000000).toFixed(6)}</p>
            </div>
           
        </div>
        <div className="address_container" >
            <span style={{'fontSize':'65%'}} className="address_in_list">{matches}
            Contract Address: <EthAddress address={item.addr} />
              </span>
        </div>
        
        <div className="index-token-icons">{getTokensIcons(item.tokens)}</div>
        <div className="buttons_container">
            <Button variant="outlined" className={classes.buttonBuy} 
            onClick={() => props.startBuyToken(props.svetTokensAmount,props.svetTokenAddress, props.state_web3)
                } style={investStyle}>BUY</Button>
            <Button variant="outlined" className={classes.buttonSell}
            onClick={() => props.startSellToken(props.state_web3)} style={investStyle}>SELL</Button>
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


const getIndexList = (address,state) => {
    if (address === "") {
        return undefined
    }
    return getContract(state, 'IndexToken', address).fn.getActivesList()
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
                let tokens_addresses_list = getIndexList(item.addr,state)
                if (tokens_addresses_list == undefined) {
                    return undefined
                }
                return  {
                    addr: item.addr,
                    name: item.name,
                    balance: currentBalance,
                    price: currentPrice,
                    tokens: tokens_addresses_list
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
    svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA(),
    state_web3: state.vtxconfig.web3.eth
    //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});



const mapDispatchToProps = dispatch => {
    return {
    changeActiveElement: (e,indexTokenName,indexTokenBalance) => dispatch(indexTokenSelect(e,indexTokenName,indexTokenBalance)),
    startBuyToken: (svetTokensAmount,svetTokenAddress,stateWeb3) => dispatch(startBuyIndexTokens(svetTokensAmount,svetTokenAddress,stateWeb3)),
    startSellToken: (stateWeb3) => dispatch(startSellToken(stateWeb3))
  }}



export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem)
