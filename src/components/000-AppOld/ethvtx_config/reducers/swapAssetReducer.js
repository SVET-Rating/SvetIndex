import * as TYPES from '../actions/types';

export const SWAP_MODE = {
  sell: 'sell',
  buy: 'buy',
};

export const STATE_MODE = {
  start: 'start',
  end: 'end',
  error: 'error',
};

const initialState = {
  assetIn: null,
  assetOut: null,
  mode: null,
  state: null,
  slippage: 3,
  delay: 1,
  swapInAmount: '0',
  swapOutAmount: '0',
};

export const swapAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_SWAP_MODE:
      return {
        ...state,
        asset: action.payload.asset,
        mode: action.payload.mode,
      };
    case TYPES.SET_SLIPPAGE:
      return {
        ...state,
        slippage: action.payload.slippage,
      };
    case TYPES.SET_DELAY:
      return {
        ...state,
        delay: action.payload.delay,
      };
    case TYPES.SET_SWAP_IN_AMOUNT:
      return {
        ...state,
        swapInAmount: action.payload.swapAmount,
      };
    case TYPES.SET_SWAP_OUT_AMOUNT:
      return {
        ...state,
        swapOutAmount: action.payload.swapOutAmount,
      };
    case TYPES.CANCEL_SWAP_ASSET:
      return {
        ...state,
        asset: null,
        mode: null,
        swapInAmount: '0',
        swapOutAmount: '0',
      };
    default:
      return state;
  }
};
