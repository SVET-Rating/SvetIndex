import {
  getAccount,
  getContract,
  getBlock,
  getWeb3,
} from 'ethvtx/lib/getters';
import tokens from '../../../tokens.json';
import contracts from '../../../embark4Contracts.json';

const SECONDS_IN_MINUTES = 60;
const FULL_COUNT = 100;

// swapAssetReducer
export const selectDelay = (state) => state.swapAssetReducer.delay;
export const selectSlippage = (state) => state.swapAssetReducer.slippage;
export const selectSwapInAmount = (state) => state.swapAssetReducer.swapInAmount;
export const selectGasPrice = (state) => state.swapAssetReducer.gasPrice;
export const selectSwapMode = (state) => state.swapAssetReducer.mode;
export const selectAssetInAddress = (state) => state.swapAssetReducer.assetIn;
export const selectAssetOutAddress = (state) => state.swapAssetReducer.assetOut;

// networkReducer
export const selectNetworkType = (state) => state.networkReducer.network;

// chainTokensReducer
export const selectWEthAddress = (state) => state.chainTokensReducer.weth;
export const selectStableTokenAddress = (state) => state.chainTokensReducer.stable;

// swapProcessReducer
export const selectSwapProcessState = (state) => state.swapProcessReducer.processState;
export const selectSwapProcessError = (state) => state.swapProcessReducer.error;

// ethvtx
export const selectWeb3Instance = (state) => getWeb3(state);
export const selectCurrentBlock = (state) => getBlock(state, state.blocks.current_height);
export const selectCoinbaseAccount = (state) => getAccount(state, '@coinbase');

export const selectSvetTokenContract = (state) => getContract(state, 'ERC20', '@svettoken');
export const selectExpertsContract = (state) => getContract(state, 'Experts', '@experts');
export const selectExchangeContract = (state) => getContract(state, 'Exchange', '@exchange');
export const selectOraclePriceContract = (state) => getContract(state, 'OraclePrice', '@oracleprice');
export const selectOracleCircAmountContract = (state) => getContract(state, 'OracleCircAmount', '@oraclecircamount');
export const selectOracleTotSupplyContract = (state) => getContract(state, 'OracleTotSupply', '@oracletotsupply');
export const selectIndexSwapContract = (state) => getContract(state, 'IndexSwap', '@indexswap');
export const selectIndexFactoryContract = (state) => getContract(state, 'IndexFactory', '@indexfactory');
export const selectLstorageContract = (state) => getContract(state, 'Lstorage', '@lstorage');
export const selectIndexStorageContract = (state) => getContract(state, 'IndexStorage', '@indexstorage');
export const selectIndexTokenContract = (state, address) => getContract(state, 'IndexToken', address);
export const selectERC20Contract = (state, address) => getContract(state, 'ERC20', address);

export const selectAssetsList = (state) => selectIndexStorageContract(state).fn.indexList();

// complex
export const selectAssetInContract = (state) => {
  const address = selectAssetInAddress(state);
  return selectIndexTokenContract(state, address);
};

export const selectAssetBalanceByAddress = (state, assetAddress) => {
  const web3Instance = selectWeb3Instance(state);
  const { address } = selectCoinbaseAccount(state);
  const inWei = selectIndexTokenContract(state, assetAddress).fn.balanceOf(address);
  if (inWei) {
    return web3Instance.utils.fromWei(inWei);
  }
};

export const selectAssetTokenListByAddress = (state, address) => {
  if (address) {
    return selectIndexTokenContract(state, address).fn.getActivesList();
  }
};

export const selectAssetInTokensList = (state) => {
  const address = selectAssetInAddress(state);
  if (address) {
    return selectIndexTokenContract(state, address).fn.getActivesList();
  }
};

export const selectSwapAssetGasAmount = (state) => {
  const tokens = selectAssetInTokensList(state);
  if (tokens) {
    return Math.round((tokens.length * 161387 + 44160 + 52010) * 1.02);
  }
};

export const selectAssetInSymbol = (state) => {
  const address = selectAssetInAddress(state);
  if (address) {
    return selectIndexTokenContract(state, address).fn.symbol();
  }
};

export const selectAssetInBalance = (state) => {
  const address = selectAssetInAddress(state);
  if (address) {
    return selectAssetBalanceByAddress(state, address);
  }
};

export const selectAssetPriceInWeiByAddress = (state, address) => {
  return selectOraclePriceContract(state).fn.getIndexPrice(address);
};

export const selectAssetPriceByAddress = (state, address) => {
  const web3Instance = selectWeb3Instance(state);
  const inWei = selectAssetPriceInWeiByAddress(state, address);
  if (inWei) {
    return web3Instance.utils.fromWei(inWei);
  }
};

export const selectAssetStablePriceByAddress = (state, address) => {
  const web3Instance = selectWeb3Instance(state);
  const stableAddress = selectStableTokenAddress(state);

  if (stableAddress) {
    const stableInWei = selectOraclePriceContract(state).fn.getLastPrice(stableAddress);
    const assetInWei = selectAssetPriceInWeiByAddress(state, address);

    if (Number(stableInWei) && assetInWei) {
      return String(
        web3Instance.utils.fromWei(assetInWei) / web3Instance.utils.fromWei(stableInWei)
      );
    }
  }
};

export const selectStableTokenPrice = (state) => {
  const address = selectStableTokenAddress(state);
  if (address) {
    return selectOraclePriceContract(state).fn.getLastPrice(address);
  }
};

// not working yet
export const selectSwapOutAsset = (state) => {
  const address = selectAssetOutAddress(state);
  if (address) {
    // return selectERC20Contract(state, address);
    return selectIndexTokenContract(state, address);
  }
};

export const selectSwapOutAssetBalance = (state) => {
  const inWei = selectCoinbaseAccount(state).balance.toString();
  const web3Instance = selectWeb3Instance(state);
  if (inWei) {
    return web3Instance.utils.fromWei(inWei);
  }
};

export const selectSwapOutAssetAmount = (state) => {
  const web3Instance = selectWeb3Instance(state);
  const assetInAmount = selectSwapInAmount(state);
  const assetInAddress = selectAssetInAddress(state);
  const priceAssetInInWei = selectAssetPriceInWeiByAddress(state, assetInAddress);
  if (assetInAmount && priceAssetInInWei) {
    const { BN } = web3Instance.utils;
    const inWei = new BN(priceAssetInInWei).mul(new BN(assetInAmount)).toString();
    return web3Instance.utils.fromWei(inWei);
  }
};

export const selectOneAmountAssetPrice = (state) => {
  const assetInAmount = selectSwapInAmount(state);
  const assetOutAmount = selectSwapOutAssetAmount(state);
  if (Number(assetInAmount) && assetOutAmount) {
    return String(assetOutAmount / assetInAmount);
  }
};

export const selectTokenShare = (state, assetAddress, tokenAddress, tokenAmountInWei) => {
  const web3Instance = selectWeb3Instance(state);
  const assetPriceInWei = selectAssetPriceInWeiByAddress(state, assetAddress);
  const tokenPriceInWei = selectOraclePriceContract(state).fn.getLastPrice(tokenAddress);
  const tokenAmount = web3Instance.utils.fromWei(tokenAmountInWei);
  if (assetPriceInWei && tokenPriceInWei) {
    return (tokenAmount * tokenPriceInWei) / assetPriceInWei;
  }
};

export const selectAssetInTokenShare = (state, tokenAddress, tokenAmountInWei) => {
  const assetAddress = selectAssetInAddress(state);
  return selectTokenShare(state, assetAddress, tokenAddress, tokenAmountInWei);
};

export const selectDelayInSeconds = (state) => {
  const delayInMinutes = selectDelay(state);
  return String(delayInMinutes * SECONDS_IN_MINUTES);
};

export const selectDiscount = (state) => {
  const slippage = selectSlippage(state);
  return String(FULL_COUNT - slippage);
};

export const selectToWei = (state, amountInEth) => {
  const web3Instance = selectWeb3Instance(state);
  if (amountInEth) {
    return web3Instance.utils.toWei(amountInEth);
  }
};

export const selectFromWei = (state, amountInWei, base = 'ether') => {
  const web3Instance = selectWeb3Instance(state);
  if (amountInWei) {
    return web3Instance.utils.fromWei(amountInWei, base);
  }
};

export const selectDataToSwap = (state) => ({
  assetAddress: selectAssetInAddress(state),
  swapInAmount: selectToWei(state, selectSwapInAmount(state)),
  swapOutAmount: selectToWei(state, selectSwapOutAssetAmount(state)),
  delay: selectDelayInSeconds(state),
  discount: selectDiscount(state),
  swapMode: selectSwapMode(state),
  coinbaseAddress: selectCoinbaseAccount(state).address,
  swapContract: selectIndexSwapContract(state),
  assetInContract: selectAssetInContract(state),
});

// --------------------------------------------------------------------

export const getStableTokenAddress = (network) => {
  const networkKey = (network === 'private')
    ? 'cloudflare'
    : network === 'ropsten'
      ? 'ropsten'
      : 'mainnet';

  if (networkKey === 'mainnet') {
    throw new Error('Mainnet');
  }

  return tokens[networkKey].DAI.address;
};

export const getWEtherAddress = (network) => {
  const networkKey = (network === 'private')
    ? 'cloudflare'
    : network === 'ropsten'
      ? 'ropsten'
      : 'mainnet';

  if (networkKey === 'mainnet') {
    throw new Error('Mainnet');
  }

  return contracts[networkKey].deploy.WETH.address;
};

// --------------------------------------------------------------------

// ERC20:
//  - isExpert

// Experts:
//  - isExpert

// Exchange:
//  - getBA

// OraclePrice:
//  - getLastPrice
//  - getLenPrice
//  - getallTokens

// OracleCircAmount:
//  - getLastamount
//  - getLenamount
//  - getallTokens

// OracleTotSupply:
//  - getLastamount
//  - getLenamount
//  - getallTokens

// IndexSwap:
//  - buyFee
//  - sellFee

// IndexFactory:
//  -

// Lstorage:
//  - getBalance

// IndexStorage:
//  - getLenIndexes
//  - indexList
//  - indexes
