import { 
    SET_CONNECTED_USERS, 
    GET_USER, 
    GET_MESSAGE,
    SET_SOCKET 
} from './index'

export const setUser = payload =>{
    return {
        type: GET_USER,
        payload
    }
}

export const setMessages = payload => {
    return{
        type: GET_MESSAGE,
        payload
    }
}

export const setSocket = payload => {
    return{
        type: SET_SOCKET,
        payload
    }
}

export const setConnecedUsers = payload => {
    return{
        type: SET_CONNECTED_USERS,
        payload
    }
}
