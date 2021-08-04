import * as TYPES from '../actions/types';
import { WETH_ADDRESS } from './reducers-constants';

const initialState = {
  mode: null,
  state: null,
  slippage: 3,
  delay: 1,
  assetIn: null,
  assetOut: null,
  swapInAmount: '0',
  network: null,
};

export const swapAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_SWAP_MODE:
      return {
        ...state,
        assetIn: action.payload.assetIn,
        assetOut: action.payload.assetOut,
        mode: action.payload.mode,
      };
    case TYPES.SET_NETWORK:
      return {
        ...state,
        network: action.payload.network,
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
    case TYPES.CANCEL_SWAP_ASSETS:
      return {
        ...state,
        assetIn: null,
        assetOut: null,
        mode: null,
        state: null,
        swapInAmount: '0',
      };
    default:
      return state;
  }
};
