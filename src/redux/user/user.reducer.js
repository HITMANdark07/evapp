import {userActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser:null,
    device:null,
    time:null,
    startTime:null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userActionTypes.SET_CURRENT_USER :
            return {
                ...state,
                currentUser:action.payload,
            }
        case userActionTypes.SET_DEVICE:
            return {
                ...state,
                device:action.payload
            }
        case userActionTypes.SET_DEVICE_TIME:
            return {
                ...state,
                time:action.payload
            }
        case userActionTypes.SET_START_TIME:
            return {
                ...state,
                startTime:action.payload
            }
        default:
            return state;
    }
}

export default userReducer;