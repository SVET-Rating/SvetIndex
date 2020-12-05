import {GET_TOKENS_BY_INDEX} from './types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

const getTokensByIndex = (address) => {
    return (dispatch, getState) => {
        // grab current state
        const state = getState();
    return {
        type: GET_TOKENS_BY_INDEX,
        payload: getContract(state, 'IndexToken', address).fn.getActivesList()
        // payload: [{name:'Good invest',symbol:'GI',amount:23},
        //           {name:'Good invest1',symbol:'GI1',amount:21},
        //           {name:'Good invest2',symbol:'GI2',amount:22}]
    }
}}

export default getTokensByIndex;