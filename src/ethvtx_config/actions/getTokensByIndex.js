import {GET_TOKENS_BY_INDEX} from './types'
import { getContract, getAccount } from 'ethvtx/lib/contracts/helpers/getters';
import {createVtxStore} from '../createVtxStore';

const getTokensByIndex = (address) => {

    return {

        type: GET_TOKENS_BY_INDEX,
        payload: address
        /* [{name:'Good invest',symbol:'GI',amount:23},
                  {name:'Good invest1',symbol:'GI1',amount:21},
                  {name:'Good invest2',symbol:'GI2',amount:22}] */
    }
}

export default getTokensByIndex;