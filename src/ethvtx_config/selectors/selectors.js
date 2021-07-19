import {
  getAccount,
  getContract,
  getBlock,
  getWeb3,
} from 'ethvtx/lib/getters';

const SECONDS_IN_MINUTES = 60;

export const selectDelay = (state) => state.swapAssetReducer.delay;
export const selectSlippage = (state) => state.swapAssetReducer.slippage;
export const selectSwapInAmount = (state) => state.swapAssetReducer.swapInAmount;
export const selectGasPrice = (state) => state.swapAssetReducer.gasPrice;
export const selectNetworkType = (state) => state.swapAssetReducer.network;
export const selectSwapMode = (state) => state.swapAssetReducer.mode;
export const selectAssetInAddress = (state) => state.swapAssetReducer.assetIn;

export const selectSwapProcessState = (state) => state.swapProcessReducer.processState;
export const selectSwapProcessError = (state) => state.swapProcessReducer.error;

export const selectWeb3Instance = (state) => getWeb3(state);
export const selectCurrentBlock = (state) => getBlock(state, state.blocks.current_height);
export const selectCoinbaseAccount = (state) => getAccount(state, '@coinbase');
export const selectAssetsList = (state) => getContract(state, 'IndexStorage', '@indexstorage').fn.indexList();
export const selectSwapContract = (state) => getContract(state, 'Index2Swap', '@indexswap');

export const selectAssetBalanceByAddress = (state, assetAddress) => {
  const { address } = getAccount(state, '@coinbase');
  return getContract(state, 'IndexToken', assetAddress).fn.balanceOf(address);
};

export const selectAssetTokenListByAddress = (state, address) => {
  if (address) {
    return getContract(state, 'IndexToken', address).fn.getActivesList();
  }
};

export const selectAssetInTokensList = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (address) {
    return getContract(state, 'IndexToken', address).fn.getActivesList();
  }
};

export const selectAssetInSymbol = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (address) {
    return getContract(state, 'IndexToken', address).fn.symbol();
  }
};

export const selectAssetInBalance = (state) => {
  const address = state.swapAssetReducer.assetIn;
  if (address) {
    return getContract(state, 'IndexToken', address).fn.balanceOf(address);
  }
};

export const selectSwapInAmountInWei = (state) => {
  const swapInAmount = selectSwapInAmount(state);
  return getWeb3(state).utils.toWei(swapInAmount);
};

export const selectDelayInSeconds = (state) => {
  const delayInMinutes = selectDelay(state);
  return String(delayInMinutes * SECONDS_IN_MINUTES);
};

export const selectDataToSwap = (state) => ({
  assetInAddress: selectAssetInAddress(state),
  swapInAmount: selectSwapInAmountInWei(state),
  delay: selectDelayInSeconds(state),
  slippage: selectSlippage(state),
  swapMode: selectSwapMode(state),
  coinbaseAddress: selectCoinbaseAccount(state).address,
  swapContract: selectSwapContract(state),
});
