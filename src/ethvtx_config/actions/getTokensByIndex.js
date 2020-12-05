import {GET_TOKENS_BY_INDEX} from './types';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';

const getTokensByIndex = (address) => {
    return (dispatch, getState) => {
        // grab current state
        const getListsOfTokens = (address) => {
                const state = getState();
                const activesList = getContract(state, 'IndexToken', address).fn.getActivesList();

                if (activesList !== undefined ) {

                        return {
                            type: GET_TOKENS_BY_INDEX,
                            payload: activesList
                            // payload: [{name:'Good invest',symbol:'GI',amount:23, addrActive: '0x1234...'},
                            //           {name:'Good invest1',symbol:'GI1',amount:21, addrActive: '0x1234...'},
                            //           {name:'Good invest2',symbol:'GI2',amount:22, addrActive: '0x1234...'}]
                        };
                } else {
                    return {
                        type: GET_TOKENS_BY_INDEX,
                        payload: []
                        
                    };
                }}
        dispatch(getListsOfTokens(address))
    }
}

export default getTokensByIndex;