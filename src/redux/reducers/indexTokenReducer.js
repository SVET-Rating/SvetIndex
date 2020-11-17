import { GET_INDEX_TOKENS_LIST, GET_TOKENS_BY_INDEX, INDEX_TOKEN_ACTIVE } from '../actions/types';
import getTokensByIndex  from '../actions/tokensByIndexToken';
 
const indexTokenInitialState = {
    'indexTokensList':[
    {name:'BEST TOKEN',balance:0, id:'0x1232311233211233',active:false},
    {
        name:'Very good Token',balance:2, 
        id:'0x3443234322344322',
        active:true,
        tokens:[{name:'very Good invest',symbol:'vGI',amount:23},
                {name:'very Good invest1',symbol:'vGI1',amount:21},
                {name:'very Good invest2',symbol:'vGI2',amount:22}]
    },
        {name:'One more token',balance:3, id:'0x34343434343434343434',active:false}
    ],
    'activeToken':''
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
                        return (dispatch) => {
                            return dispatch(getTokensByIndex(item.address))
                        }
                    } 
                    else 
                    {
                        item.active = false
                    } 
                    return item
                })
                }
            return newState
        // eslint-disable-next-line no-fallthrough
        case GET_TOKENS_BY_INDEX:
            return state
        default:
            return state;
    }
}

export default indexTokenReducer;

