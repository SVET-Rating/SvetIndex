import * as TYPES from '../actions/types';

const initialState = {
  weth: null, // rename to baseTokenAddress
  stable: null, // rename to stableTokenAddress

  explorerName: null,
  explorerUrl: null,

  nativeCurrencyName: null,
  nativeCurrencySymbol: null,
  nativeCurrencyDecimals: null,

  chainName: null,
  chainNetwork: null,
  chainIcon: null,
  chain: null,
};

export const chainTokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_INITIAL_DATA:
      return {
        ...state,
        ...action.payload.chainData,
      };
    case TYPES.SET_CHAIN_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
