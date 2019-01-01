import {
  GET_USER,
  SET_CONNECTED_USERS,
  GET_MESSAGE,
  TYPING,
  UPDATE_NO,
  SET_SOCKET,
  SET_ROOM
} from '../actions'

const initialState = {
  details: {
    socket: null,
    username: null,
    connectedUsers: [],
    newChats: {
      'community': 0
    },
    messages: {
      'community': []
    },
    chatRoom: 'community'
  }
}

export default function (state = initialState, action) {
  switch (action.type) {

    case UPDATE_NO:
      let new_state_1 = { ...state.details }
      new_state_1['newChats'][action.payload] += 1
      return {
        ...state,
        details: {
          ...new_state_1
        }
      }

    case SET_ROOM:
      let chat_room = action.payload
      let new_state = { ...state.details }
      new_state['chatRoom'] = chat_room
      new_state.messages[chat_room] = []
      new_state.newChats[chat_room] = 0
      return {
        ...state,
        details: {
          ...new_state
        }
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
      var { message, chatRoom } = action.payload
      let newState = { ...state.details }
      if (newState.messages[chatRoom])
        newState.messages[chatRoom].push(message)
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