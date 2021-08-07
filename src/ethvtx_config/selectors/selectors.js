import {
  getAccount,
  getContract,
  getBlock,
  getWeb3,
} from 'ethvtx/lib/getters';

export const selectDelay = (state) => state.swapAssetReducer.delay;
export const selectSlippage = (state) => state.swapAssetReducer.slippage;
export const selectSwapInAmount = (state) => state.swapAssetReducer.swapInAmount;
export const selectGasPrice = (state) => state.swapAssetReducer.gasPrice;
export const selectNetworkType = (state) => state.swapAssetReducer.network;
export const selectSwapMode = (state) => state.swapAssetReducer.mode;

export const selectWeb3Instance = (state) => getWeb3(state);
export const selectCurrentBlock = (state) => getBlock(state, state.blocks.current_height);
export const selectCoinbaseAccount = (state) => getAccount(state, '@coinbase');
export const selectAssetsList = (state) => getContract(state, 'IndexStorage', '@indexstorage').fn.indexList();

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
