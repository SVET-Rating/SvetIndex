import React from 'react';
import { connect } from 'react-redux';
// import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
// import startBuyIndexTokens from '../../ethvtx_config/actions/startToBuyIndexTokens';
// import startSellToken from '../../ethvtx_config/actions/startSellIndexTokens';
// import IndexTokens from '../indexTokenTokens/TokensInIndexTokenList';
//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract } from 'ethvtx/lib/getters';
// import { getContract, getContractList } from 'ethvtx/lib/getters';
//import contracts from '../embarkArtifacts/contracts';
import { Box, List } from '@material-ui/core';
// import tokenList from '../../assets/tokenlist.json';
import AssetItem from '../AssetItem/AssetItem';
import useStyles from './styles';

const AssetsList = ({ assetsList = [] }) => {
  const classes = useStyles();

  if (assetsList.length) {
    const items = assetsList.map((item) => (
      <AssetItem key={item.addr} item={item} />
    ));

    return (
      <List className={classes.root}>
        {items}
      </List>);
  } else {
    return <Box>Data loading...</Box>;
  }
};

// const getIndexPriceInSvet = (indexTokenAddress, state) => {
//   let tokenPrice;

//   let svetTokenAddress = getContract(state, 'Exchange', '@exchange').fn.getBA();
//   if (svetTokenAddress == undefined) {
//     return undefined;
//   }

//   let tokensList = getContract(state, 'IndexToken', indexTokenAddress).fn.getActivesList();
//   if (tokensList == undefined) {
//     return undefined;
//   }

//   const tokensPrice = tokensList.map((item, key) => {
//     const tokenPriceCurrent = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item[0]);
//     if (tokenPriceCurrent === undefined) {
//       return tokenPriceCurrent;
//     }
//     tokenPrice = tokenPriceCurrent / 10**item[2] * item[1] / 10000
//         ///10^item[4]
//     return tokenPrice;
//   });

//   const svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(svetTokenAddress);
//   if (svetTokenPrice === undefined) {
//     return svetTokenPrice;
//   }
//   if (tokensPrice.indexOf(undefined) !== -1) {
//     return undefined;
//   }

//   const resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0);
//   return resultIndexTokenPriceUSD / (svetTokenPrice / 10**18);
// };

// const getIndexList = (address,state) => {
//   if (address === "") {
//     return undefined;
//   }
//   return getContract(state, 'IndexToken', address).fn.getActivesList();
// };

// const indexListWithBalance = (state) => {
//   const indexTokensList = getContract(state, 'IndexStorage', '@indexstorage').fn.indexList();

//   if (indexTokensList != undefined) {
//     const resultList = indexTokensList.map((item, key) => {
//       const currentBalance = getContract(state, 'IndexToken', item.addr)
//         .fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress);
//       // const currentPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item.addr);
//       const currentPrice = getIndexPriceInSvet(item.addr, state);

//       if (currentBalance == undefined || currentPrice == undefined) {
//         return undefined;
//       } else {
//         const tokens_addresses_list = getIndexList(item.addr,state);

//         if (tokens_addresses_list == undefined) {
//           return undefined;
//         }

//         return {
//           addr: item.addr,
//           name: item.name,
//           balance: currentBalance,
//           price: currentPrice,
//           tokens: tokens_addresses_list,
//           //._contract.methods.balanceOf(state.contracts.web3.currentProvider.selectedAddress)
//         };
//       }
//     });

//     if (resultList.indexOf(undefined) == -1 ) {
//       return resultList;
//     } else {
//       return undefined;
//     }
//   } else {
//     return undefined;
//   }
// };

const mapStateToProps = (state) => ({
  assetsList: getContract(state, 'IndexStorage', '@indexstorage').fn.indexList(),
  // indexList: indexListWithBalance(state),
  // contractsList: getContractList(state),
  // activeToken: state.indexTokenReducer.activeToken,
  // svetTokensAmount: getContract(
  //     state, 'ERC20', '@svettoken'
  //   ).fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress) / 10**18,
  // svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA(),
  // state_web3: state.vtxconfig.web3.eth,
  //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeActiveElement: (e, indexTokenName, indexTokenBalance) => (
//       dispatch(indexTokenSelect(e, indexTokenName, indexTokenBalance))
//     ),
//     startBuyToken: (svetTokensAmount, svetTokenAddress, stateWeb3) => (
//       dispatch(startBuyIndexTokens(svetTokensAmount, svetTokenAddress, stateWeb3))
//     ),
//     startSellToken: (stateWeb3) => dispatch(startSellToken(stateWeb3)),
//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(AssetsListAssetItem);
export default connect(mapStateToProps)(AssetsList);
