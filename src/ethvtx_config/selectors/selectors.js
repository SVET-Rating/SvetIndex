import {
  getAccount,
  getContract,
  getBlock,
  getWeb3,
} from 'ethvtx/lib/getters';
import * as c from '../reducers/reducers-constants';
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

// convert
export const selectToWei = (state, amountInEth) => {
  const web3Instance = selectWeb3Instance(state);
  if (web3Instance && amountInEth && Number(amountInEth)) {
    return web3Instance.utils.toWei(amountInEth);
  }
};

export const selectFromWei = (state, amountInWei, base = 'ether') => {
  const web3Instance = selectWeb3Instance(state);
  if (web3Instance && amountInWei && Number(amountInWei)) {
    return web3Instance.utils.fromWei(amountInWei, base);
  }
};

// complex
export const selectAssetInContract = (state) => {
  const address = selectAssetInAddress(state);

  if (address) {
    return selectIndexTokenContract(state, address);
  }
};

export const selectAssetBalanceByAddress = (state, assetAddress) => {
  const { address } = selectCoinbaseAccount(state);

  if (address && assetAddress) {
    const inWei = selectIndexTokenContract(state, assetAddress).fn.balanceOf(address);

    if (inWei) {
      return selectFromWei(state, inWei);
    }
  }
};

export const selectAssetTokensListByAddress = (state, address) => {
  if (address) {
    return selectIndexTokenContract(state, address).fn.getActivesList();
  }
};

export const selectAssetInTokensList = (state) => {
  const address = selectAssetInAddress(state);

  if (address) {
    return selectAssetTokensListByAddress(state, address);
  }
};

// not correct --------------------------------------------------------------------------------
export const selectSwapAssetGasAmount = (state) => {
  const tokens = selectAssetInTokensList(state);

  if (tokens) {
    return Math.round((tokens.length * 161387 + 44160 + 52010) * 1.02);
  }
};
// not correct --------------------------------------------------------------------------------

export const selectAssetSymbolByAddress = (state, address) => {
  if (address) {
    const contract = selectIndexTokenContract(state, address);
    if (contract) {
      return contract.fn.symbol();
    }
  }
};

export const selectAssetInSymbol = (state) => {
  const address = selectAssetInAddress(state);

  if (address) {
    return selectAssetSymbolByAddress(state, address);
  }
};

export const selectAssetInBalance = (state) => {
  const address = selectAssetInAddress(state);

  if (address) {
    return selectAssetBalanceByAddress(state, address);
  }
};

export const selectAssetPriceForAmountByAddress = (state, address, amountInEth = '1') => {
  const mode = selectSwapMode(state);
  const swapType = (mode === c.SWAP_MODE.sell) ? false : true;

  if (address && Number(amountInEth)) {
    const inWei = selectToWei(state, amountInEth); // todo: check 10^-18 in amountInEth

    const price = selectOraclePriceContract(state).fn.getIndexPriceforAmount(address, inWei, swapType);
    return (typeof price === 'object') ? undefined : price;
  }
};

export const selectAssetInPriceForAmount = (state, amountInEth = '1') => {
  const address = selectAssetInAddress(state);

  if (address && Number(amountInEth)) {
    const price = selectAssetPriceForAmountByAddress(state, address, amountInEth);

    if (price) {
      return selectFromWei(state, price);
    }
  }
};

export const selectAssetAllTokensPriceForAmountByAddress = (state, address, amountInEth = '1') => {
  const mode = selectSwapMode(state);
  const swapType = (mode === c.SWAP_MODE.sell) ? false : true;

  if (address && Number(amountInEth)) {
    const inWei = selectToWei(state, amountInEth); // todo: check 10^-18 in amountInEth

    const prices = selectOraclePriceContract(state).fn.getAllActsIndPricesAmount(address, inWei, swapType);
    return (typeof prices === 'object' && !Array.isArray(prices)) ? undefined : prices;
  }
};

export const selectAssetInAllTokensPriceForAmountByAddress = (state, amountInEth = '1') => {
  const address = selectAssetInAddress(state);

  if (address && Number(amountInEth)) {
    const prices = selectAssetAllTokensPriceForAmountByAddress(state, address, amountInEth);

    if (prices && Array.isArray(prices)) {
      return prices.map((price) => selectFromWei(state, price));
    }
  }
};

export const selectStableTokenPrice = (state, amountInEth = '1') => {
  const address = selectStableTokenAddress(state);

  const mode = selectSwapMode(state);
  const swapType = (mode === c.SWAP_MODE.sell) ? false : true;

  if (Number(amountInEth) && address) {
    const inWei = selectToWei(state, amountInEth); // todo: check 10^-18 in amountInEth

    const price = selectOraclePriceContract(state).fn.getPriceEthforAmount(address, inWei, swapType);
    return (typeof price === 'object') ? undefined : price;
  }
};

export const selectAssetStablePriceByAddress = (state, address) => {
  const stableAddress = selectStableTokenAddress(state);

  if (stableAddress && address) {
    const stableInWei = selectStableTokenPrice(state);
    const assetInWei = selectAssetPriceForAmountByAddress(state, address);

    if (Number(stableInWei) && Number(assetInWei)) {
      return String(
        selectFromWei(state, assetInWei) / selectFromWei(state, stableInWei)
      );
    }
  }
};

// not working yet --------------------------------------------------------------------
export const selectSwapOutAsset = (state) => {
  const address = selectAssetOutAddress(state);

  if (address) {
    // return selectERC20Contract(state, address);
    return selectIndexTokenContract(state, address);
  }
};
// not working yet --------------------------------------------------------------------

export const selectSwapOutAssetBalance = (state) => {
  const inWei = selectCoinbaseAccount(state).balance.toFixed();

  if (inWei) {
    return selectFromWei(state, inWei);
  }
};

export const selectSwapOutAssetAmount = (state) => {
  const assetInAmount = selectSwapInAmount(state);
  const assetInAddress = selectAssetInAddress(state);

  if (Number(assetInAmount) && assetInAddress) {
    const priceAssetInInWei = selectAssetPriceForAmountByAddress(state, assetInAddress, assetInAmount);

    if (priceAssetInInWei) {
      const priceAssetInInEther = selectFromWei(state, priceAssetInInWei);
      const mode = selectSwapMode(state);
      const slippage = selectSlippage(state);

      const ratio = (mode === c.SWAP_MODE.buy)
        ? 1 + Number(slippage) / 100
        : 1;

      const amount = (priceAssetInInEther * assetInAmount) * ratio;
      return amount.toFixed(18);
    }
  }
};

export const selectOneAmountAssetPrice = (state) => {
  const assetInAmount = selectSwapInAmount(state);
  const assetOutAmount = selectSwapOutAssetAmount(state);

  if (Number(assetInAmount) && Number(assetOutAmount)) {
    return String(assetOutAmount / assetInAmount);
  }
};

export const selectTokenShare = (state, assetAddress, tokenAddress, tokenAmountInWei) => {
  const mode = selectSwapMode(state);
  const swapType = (mode === c.SWAP_MODE.sell) ? false : true;

  if (assetAddress && tokenAddress && Number(tokenAmountInWei)) {
    const assetPriceInWei = selectAssetPriceForAmountByAddress(state, assetAddress);
    const price = selectOraclePriceContract(state).fn
      .getPriceEthforAmount(tokenAddress, tokenAmountInWei, swapType);

    const tokenPriceInWei = (typeof price === 'object') ? undefined : price;

    if (Number(assetPriceInWei) && tokenPriceInWei) {
      const tokenAmount = selectFromWei(state, tokenAmountInWei); // todo: check 10^-18 in amountInEth
      return (tokenPriceInWei / assetPriceInWei) * tokenAmount;
    }
  }
};

export const selectAssetInTokenShare = (state, tokenAddress, tokenAmountInWei) => {
  const assetAddress = selectAssetInAddress(state);

  if (assetAddress) {
    return selectTokenShare(state, assetAddress, tokenAddress, tokenAmountInWei); // todo: check 10^-18 in amountInEth
  }
};

export const selectDelayInSeconds = (state) => {
  const delayInMinutes = selectDelay(state);
  return String(delayInMinutes * SECONDS_IN_MINUTES);
};

export const selectDiscount = (state) => {
  const slippage = selectSlippage(state);
  return String(FULL_COUNT - slippage);
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

// --------------------------------------------------------------------------------------

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
