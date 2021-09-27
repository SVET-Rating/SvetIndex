import * as TYPES from './types';

export const getInitialData = () => ({
  type: TYPES.GET_INITIAL_DATA,
});

export const setInitialData = (initialData) => ({
  type: TYPES.SET_INITIAL_DATA,
  payload: { ...initialData },
});

export const setNetwork = (network) => ({
  type: TYPES.SET_NETWORK,
  payload: { ...network },
});

export const setNetworkInitialized = (isInitialized) => ({
  type: TYPES.SET_NETWORK,
  payload: { isInitialized },
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

export const setInvesting = ({ assetIn, assetOut, mode }) => ({
  type: TYPES.SET_INVESTING,
  payload: { assetIn, assetOut, mode },
});

export const setSwapMode = (mode) => ({
  type: TYPES.SET_SWAP_MODE,
  payload: { mode },
});

export const setError = (error) => ({
  type: TYPES.SET_ERROR,
  payload: { error },
});

export const getGasPrice = () => ({
  type: TYPES.GET_GAS_PRICE,
});

export const setGasPrice = (gasPrice) => ({
  type: TYPES.SET_GAS_PRICE,
  payload: { gasPrice },
});

export const cancelSwap = () => ({
  type: TYPES.CANCEL_SWAP_ASSETS,
});

export const setSwapStart = () => ({
  type: TYPES.SET_SWAP_START,
});

export const setSwapEnd = () => ({
  type: TYPES.SET_SWAP_END,
});

export const setSwapProcessState = (processState) => ({
  type: TYPES.SET_SWAP_PROCESS_STATE,
  payload: { processState },
});

export const setChainData = (chainData) => ({
  type: TYPES.SET_CHAIN_DATA,
  payload: { ...chainData },
});

export const resetSwapProcessState = () => ({
  type: TYPES.RESET_SWAP_PROCESS_STATE,
});
