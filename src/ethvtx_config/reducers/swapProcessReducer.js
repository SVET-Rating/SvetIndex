import * as TYPES from '../actions/types';

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
