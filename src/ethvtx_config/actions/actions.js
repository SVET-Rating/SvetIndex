import * as TYPES from './types';

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

export const cancelSwap = () => ({
  type: TYPES.CANCEL_SWAP_ASSETS,
});
