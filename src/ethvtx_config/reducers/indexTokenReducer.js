import { GET_INDEX_TOKENS_LIST, GET_TOKENS_BY_INDEX, INDEX_TOKEN_ACTIVE } from '../actions/types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';


const indexTokenInitialState = {
    'activeToken': '',
    'indexTokensList': []
}

const indexTokenReducer = (state=indexTokenInitialState, action) => {
    switch(action.type) {
        case GET_INDEX_TOKENS_LIST:
            return {...state, indexTokensList: action.payload }
        case INDEX_TOKEN_ACTIVE:
            let newState = {...state,
                indexTokensList:state.indexTokensList.map((item,key) => { 
                    if (item.id === action.payload) 
                    {
                        item.active = true
                    } 
                    else 
                    {
                        item.active = false
                    } 
                    return item
                })
                }
            return newState
        default:
            return state;
    }
}

export default indexTokenReducer;

