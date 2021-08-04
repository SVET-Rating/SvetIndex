import React from 'react';
import { connect } from 'react-redux';
import { getContract, getAccount, getWeb3 } from 'ethvtx/lib/getters';
// import BN from 'bn.js';
import { Box, Divider, Typography } from '@material-ui/core';
import AppAssetAmount from '../AppAssetAmount/AppAssetAmount';
import useStyles from './styles';

const ETHER_SYMBOL = 'ETH';
const WETHER_SYMBOL = 'WETH';
const USD_SYMBOL = '$';

const AssetItemBalance = ({ balance, price }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.block}>
        <Typography className={classes.text}>Index in wallet:</Typography>
        <AppAssetAmount
          className={classes.value}
          amount={balance}
          precision={2}
        />
      </Box>

      <Divider className={classes.divider}/>

      <Box className={classes.blockPrice}>
        <Box className={classes.price}>
          <Typography className={classes.text}>Index price:</Typography>
          <AppAssetAmount
            className={classes.value}
            amount={price}
            symbol={ETHER_SYMBOL}
            precision={6}
          />
        </Box>
        <Box className={classes.price}>
          <AppAssetAmount
            className={classes.value}
            amount={'126.35'}
            symbol={USD_SYMBOL}
            withParentheses
          />
        </Box>
      </Box>
    </Box>
  );
}

// const getPrice = (state, AssetAddress) => {
//   let tokenPrice;

//   const baseAddress = getContract(state, 'Exchange', '@exchange').fn.getBA();
//   if (!baseAddress) {
//     return undefined;
//   }

//   const tokensList = getContract(state, 'IndexToken', AssetAddress).fn.getActivesList();
//   if (!tokensList) {
//     return undefined;
//   }

//   const tokensPrice = tokensList.map(({ addrActive, amount, decimals }) => {
//     const tokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(addrActive);
//     console.log('tokenPrice ---', tokenPrice)
//     if (!tokenPrice) {
//       return undefined;
//     }
//     return tokenPriceCurrent / 10**decimals * amount / 10000;
//   });

//   const svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(baseAddress);
//   if (svetTokenPrice === undefined) {
//     return svetTokenPrice;
//   }
//   if (tokensPrice.indexOf(undefined) !== -1) {
//     return undefined;
//   }

//   const resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0);
//   return resultIndexTokenPriceUSD / (svetTokenPrice / 10**18);
// };

const getPrice = (state) => {
  const baseAddress = getContract(state, 'Exchange', '@exchange').fn.getBA();
  if (!baseAddress) {
    return undefined;
  }

  // it is temporary and wrong !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const priceInWei = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(baseAddress);
  if (!priceInWei) {
    return undefined;
  }

  return getWeb3(state).utils.fromWei(priceInWei);
};

const getBalance = (state, AssetAddress) => {
  const { address } = getAccount(state, '@coinbase');
  return getContract(state, 'IndexToken', AssetAddress).fn.balanceOf(address);
};

const mapStateToProps = (state, { address }) => ({
  balance: getBalance(state, address),
  price: getPrice(state),
  // price: getPrice(state, address),
});

export default connect(mapStateToProps)(AssetItemBalance);
