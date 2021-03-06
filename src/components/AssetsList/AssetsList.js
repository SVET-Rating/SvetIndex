import React from 'react';
import { connect } from 'react-redux';
// import contracts from '../embarkArtifacts/contracts';
// import tokenList from '../../assets/tokenlist.json';
import { Box, List } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetItem from '../AssetItem/AssetItem';
import OrbitLoader from '../loaders/OrbitLoader/OrbitLoader';
import useStyles from './styles';

const AssetsList = ({ assetsList = [], chainId }) => {
  const classes = useStyles();

  if (chainId && chainId !== 137) {
    return (
      <Box className={classes.rootLoading}>
        Connect to polygon to launch SVET Index application!
      </Box>
    );
  }

  if (!assetsList.length) {
    return (
      <Box className={classes.rootLoading}>
        <OrbitLoader className={classes.loader} loading={true} />
        Data loading...
      </Box>
    );
  }

  const items = assetsList.map((item) => (
    <AssetItem key={item.addr} item={item} />
  ));

  return (
    <List className={classes.root}>
      {items}
    </List>
  );
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
  assetsList: s.selectAssetsList(state),
  chainId: s.selectChainId(state),
  // indexList: indexListWithBalance(state),
  // contractsList: getContractList(state),
  // svetTokensAmount: getContract(
  //     state, 'ERC20', '@svettoken'
  //   ).fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress) / 10**18,
  // svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA(),
  //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});

export default connect(mapStateToProps)(AssetsList);
