import {GET_TOKENS_BY_INDEX} from './types';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';

const getTokensByIndex = (address) => {
    return (dispatch, getState) => {
        // grab current state
        const state = getState();
        const curTokenContr = getContract(state, 'IndexToken', address);
        if (curTokenContr !== undefined ) {
            var actives = []; 
            curTokenContr.fn.getActivesList().map((item, key) => {
                const curERCtok = getContract(state, 'IndexToken', item.addrActive);
                var curActive;
                curActive.name =curERCtok.fn.name();
                curActive.symbol =curERCtok.fn.symbol();
                curActive.address = item.addrActive;
                curActive.amount = item.amount;
                actives.push(curActive);
            });
                return {
                    type: GET_TOKENS_BY_INDEX,
                    payload: actives
                    // payload: [{name:'Good invest',symbol:'GI',amount:23},
                    //           {name:'Good invest1',symbol:'GI1',amount:21},
                    //           {name:'Good invest2',symbol:'GI2',amount:22}]
                };
        }
    }
}

export default getTokensByIndex;