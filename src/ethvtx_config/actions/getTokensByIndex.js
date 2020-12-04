import {GET_TOKENS_BY_INDEX} from './types'

const getTokensByIndex = (address) => {
    return {
        type: GET_TOKENS_BY_INDEX,
        payload: [{name:'Good invest',symbol:'GI',amount:23},
                  {name:'Good invest1',symbol:'GI1',amount:21},
                  {name:'Good invest2',symbol:'GI2',amount:22}]
    }
}

export default getTokensByIndex;