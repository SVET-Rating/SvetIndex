import {
  getAccount,
  getContract,
  getBlock,
  getWeb3,
} from 'ethvtx/lib/getters';

const SECONDS_IN_MINUTES = 60;
const FULL_COUNT = 100;

export const selectDelay = (state) => state.swapAssetReducer.delay;
export const selectSlippage = (state) => state.swapAssetReducer.slippage;
export const selectSwapInAmount = (state) => state.swapAssetReducer.swapInAmount;
export const selectGasPrice = (state) => state.swapAssetReducer.gasPrice;
export const selectNetworkType = (state) => state.swapAssetReducer.network;
export const selectSwapMode = (state) => state.swapAssetReducer.mode;
export const selectAssetInAddress = (state) => state.swapAssetReducer.assetIn;
export const selectAssetOutAddress = (state) => state.swapAssetReducer.assetOut;

export const selectSwapProcessState = (state) => state.swapProcessReducer.processState;
export const selectSwapProcessError = (state) => state.swapProcessReducer.error;

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

export const selectAssetPriceByAddress = (state, address) => {
  const web3Instance = selectWeb3Instance(state);
  const amount = web3Instance.utils.toWei('1');
  if (amount && address) {
    return selectOraclePriceContract(state).fn.getIndexPriceforAmount(address, amount);
  }
};

export const selectAssetTokenShare = (state, token) => {
  const web3Instance = selectWeb3Instance(state);
  return web3Instance.utils.fromWei(token.amount);
};

export const selectSwapOutAsset = (state) => {
  const address = selectAssetOutAddress(state);
  if (address) {
    // return selectERC20Contract(state, address);
    return selectIndexTokenContract(state, address);
  }
};

export const selectSwapOutAssetAmount = (state) => {
  const inWei = selectCoinbaseAccount(state).balance.toString();
  const web3Instance = selectWeb3Instance(state);
  if (inWei) {
    return web3Instance.utils.fromWei(inWei);
  }
};

export const selectSwapInAmountInWei = (state) => {
  const swapInAmount = selectSwapInAmount(state);
  const web3Instance = selectWeb3Instance(state);
  return web3Instance.utils.toWei(swapInAmount);
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
  swapAmount: selectSwapInAmountInWei(state),
  delay: selectDelayInSeconds(state),
  discount: selectDiscount(state),
  swapMode: selectSwapMode(state),
  coinbaseAddress: selectCoinbaseAccount(state).address,
  swapContract: selectIndexSwapContract(state),
  assetInContract: selectAssetInContract(state),
});

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
