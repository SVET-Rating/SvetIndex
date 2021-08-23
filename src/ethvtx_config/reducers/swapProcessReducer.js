import * as TYPES from '../actions/types';
import { SWAP_STATE } from './reducers-constants';

const initialState = {
  processState: null,
  error: null,
};

export const swapProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case TYPES.SET_SWAP_END:
      return {
        ...state,
        processState: SWAP_STATE.end,
      };
    case TYPES.SET_SWAP_PROCESS_STATE:
      return {
        ...state,
        processState: action.payload.processState,
      };
    case TYPES.RESET_SWAP_PROCESS_STATE:
      return {
        ...state,
        processState: null,
        error: null,
      };
    default:
      return state;
  }
};
