import * as TYPES from './types';

export const setInitialData = () => ({
  type: TYPES.SET_INITIAL_DATA,
});

export const setNetwork = (network) => ({
  type: TYPES.SET_NETWORK,
  payload: { network },
});

export const setSlippage = (slippage) => ({
  type: TYPES.SET_SLIPPAGE,
  payload: { slippage },
});

export const setDelay = (delay) => ({
  type: TYPES.SET_DELAY,
  payload: { delay },
});

export const setSwapInAmount = (swapAmount) => ({
  type: TYPES.SET_SWAP_IN_AMOUNT,
  payload: { swapAmount },
});

export const setSwapMode = ({ assetIn, assetOut, mode }) => ({
  type: TYPES.SET_SWAP_MODE,
  payload: { assetIn, assetOut, mode },
});

export const setError = (error) => ({
  type: TYPES.SET_ERROR,
  payload: { error },
});

export const setGasPrice = (gasPrice) => ({
  type: TYPES.SET_GAS_PRICE,
  payload: { gasPrice },
});

export const cancelSwap = () => ({
  type: TYPES.CANCEL_SWAP_ASSETS,
});

export const setStartSwap = () => ({
  type: TYPES.SET_START_SWAP,
});

export const setSwapProcessState = (processState) => ({
  type: TYPES.SET_SWAP_PROCESS_STATE,
  payload: { processState },
});

export const getAssetPrice = (address) => ({
  type: TYPES.GET_ASSET_PRICE,
  payload: { address },
});

export const setAssetPrice = ({ address, price }) => ({
  type: TYPES.SET_ASSET_PRICE,
  payload: { address, price },
});
