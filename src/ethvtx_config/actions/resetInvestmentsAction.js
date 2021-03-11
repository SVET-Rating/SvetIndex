import {RESET_INVESTMENTS} from '../processStates/resetProcessStates';


const backToIndexTokensList = () => {
    return {
        type:RESET_INVESTMENTS,
        payload:true
    }
}

export default backToIndexTokensList;