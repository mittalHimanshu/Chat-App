import { 
    SET_CONNECTED_USERS, 
    TYPING,
    GET_USER, 
    GET_MESSAGE,
    SET_SOCKET,
    SET_ROOM
} from './index'

export const setUser = payload =>{
    return {
        type: GET_USER,
        payload
    }
}

export const setMessages = (message, chatRoom) => {
    return{
        type: GET_MESSAGE,
        payload:{
            message, chatRoom
        }
    }
}

export const setChatRoom = payload => {
    return{
        type: SET_ROOM,
        payload
    }
}

export const setSocket = payload => {
    return{
        type: SET_SOCKET,
        payload
    }
}

export const setConnecedUsers = users => {
    var conUsers = []
    users.map(user=>{
        const {username} = user
        conUsers.push({
            username,
            isTyping: false
        })
    })
    return{
        type: SET_CONNECTED_USERS,
        payload: conUsers
    }
}

export const changeConnectedUsers = (connectedUsers, username, extra=false) => {
    connectedUsers.map(user => {
        if(user.username === username)
            if(extra === false)
                user.isTyping = true
            else
                user.isTyping = false
    })
    return{
        type: TYPING,
        payload: connectedUsers
    }
}
