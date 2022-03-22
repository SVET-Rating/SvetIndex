import * as TYPES from './types';

export const setSlippage = (slippage) => ({
  type: TYPES.SET_SLIPPAGE,
  payload: { slippage },
});

export const setDelay = (delay) => ({
  type: TYPES.SET_DELAY,
  payload: { delay },
});

export const setSwapInAmount = (swapInAmount) => ({
  type: TYPES.SET_SWAP_IN_AMOUNT,
  payload: { swapInAmount },
});

export const setSwapOutAmount = (swapOutAmount) => ({
  type: TYPES.SET_SWAP_OUT_AMOUNT,
  payload: { swapOutAmount },
});

export const setSwapMode = ({ asset, mode }) => ({
  type: TYPES.SET_SWAP_OUT_AMOUNT,
  payload: { asset, mode },
});

export const cancelSwap = () => ({
  type: TYPES.CANCEL_SWAP_ASSET,
});
