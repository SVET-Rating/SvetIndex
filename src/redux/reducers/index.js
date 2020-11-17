import {combineReducers} from 'redux';
import indexTokenReducer from './indexTokenReducer';


const rootReducer = combineReducers({
    indexTokensList:indexTokenReducer
})

export default rootReducer;