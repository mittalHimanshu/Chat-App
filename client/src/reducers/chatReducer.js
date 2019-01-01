import {
  GET_USER,
  SET_CONNECTED_USERS,
  GET_MESSAGE,
  TYPING,
  SET_SOCKET,
  SET_ROOM
} from '../actions'

const initialState = {
  details: {
    socket: null,
    username: null,
    connectedUsers: [],
    messages: {
      'community': []
    },
    chatRoom: 'community'
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROOM:
      let chat_room = action.payload
      let new_state = {...state}
      new_state.details.chatRoom = chat_room 
      new_state.details.messages[chat_room] = []
      return {
        ...state,
      }
    case GET_USER:
      return {
        ...state,
        details: {
          ...state.details,
          username: action.payload
        }
      }
    case GET_MESSAGE:
      const { message, chatRoom } = action.payload
      let newState = {...state}
      newState.details.messages[chatRoom].push(message)
      return {
        ...state
      }
    case SET_SOCKET:
      return {
        ...state,
        details: {
          ...state.details,
          socket: action.payload
        }
      }
    case SET_CONNECTED_USERS:
      return {
        ...state,
        details: {
          ...state.details,
          connectedUsers: action.payload
        }
      }
    case TYPING:
      return {
        ...state,
        details: {
          ...state.details,
          connectedUsers: action.payload
        }
      }
    default:
      return state
  }
}