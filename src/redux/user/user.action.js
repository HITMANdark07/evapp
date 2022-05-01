import { userActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
        type: userActionTypes.SET_CURRENT_USER,
        payload: user 
})
export const setDevice = (device) => ({
        type:userActionTypes.SET_DEVICE,
        payload: device
})
export const setDeviceTime = (time) => ({
        type:userActionTypes.SET_DEVICE_TIME,
        payload:time
})
export const setStartTime = (time) => ({
        type:userActionTypes.SET_START_TIME,
        payload:time
})