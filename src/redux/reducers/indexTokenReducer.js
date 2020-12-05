import { GET_INDEX_TOKENS_LIST,  INDEX_TOKEN_ACTIVE } from '../actions/types';
 
const indexTokenInitialState = {
    'indexTokensList':[
    {name:'BEST TOKEN',balance:0, id:'0x1232311233211233',active:false},
    {
        name:'Very good Token',balance:2, 
        id:'0x3443234322344322',
        active:true,
        
    },
        {name:'One more token',balance:3, id:'0x34343434343434343434',active:false}
    ],
    'tokens':[],
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
            return state
    }
}

export default indexTokenReducer;

