import {
    GET_MESSAGES, 
    SEND_MESSAGE, 
    GET_USER, 
    GET_MESSAGE,
    SET_SOCKET
} from '../actions'

const initialState = {
    details: {
        socket: null,
        username: null,
        messages: []
    }
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_MESSAGES:
            return state
        case SEND_MESSAGE:
            return state
        case GET_USER:
            return{
                ...state,
                details: {
                    ...state.details,
                    username: action.payload
                }
            }
        case GET_MESSAGE:
            return{
                ...state,
                details: {
                    ...state.details,
                    messages: [...state.details.messages, action.payload]
                }
            }
        case SET_SOCKET:{
            return{
                ...state,
                details:{
                    ...state.details,
                    socket: action.payload
                }
            }
        }
        default:
            return state
    }
}