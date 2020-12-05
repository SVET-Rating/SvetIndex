import {combineReducers} from 'redux';
import indexTokenReducer from './indexTokenReducer';
import indexTokenTokens from './indexTokenTokensReducer'


const rootReducer = combineReducers({
    indexTokensList:indexTokenReducer,
    indexTokenTokens: indexTokenTokens
})

export default rootReducer;