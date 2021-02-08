import {RESET_INVESTMENTS} from './types';


const backToIndexTokensList = (e) => {
    return {
        type:RESET_INVESTMENTS,
        payload:true
    }
}

export default backToIndexTokensList;