import {
  GET_USER,
  SET_CONNECTED_USERS,
  GET_MESSAGE,
  SET_SOCKET
} from '../actions'

const initialState = {
  details: {
    socket: null,
    username: null,
    messages: [{}],
    connectedUsers: []
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        details: {
          ...state.details,
          username: action.payload
        }
      }
    case GET_MESSAGE:
      return {
        ...state,
        details: {
          ...state.details,
          messages: [...state.details.messages, action.payload]
        }
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
        details:{
          ...state.details,
          connectedUsers: [...state.details.connectedUsers, action.payload]
        }
      }
    default:
      return state
  }
}