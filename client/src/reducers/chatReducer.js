import {
  GET_USER,
  SET_CONNECTED_USERS,
  GET_MESSAGE,
  TYPING,
  UPDATE_NO,
  DELETE_USER_INFO,
  SET_SOCKET,
  SET_ROOM,
  SET_CURRENT_TAB,
  RESET_MESSAGES_SENT
} from '../actions'

const initialState = {
  details: {
    socket: null,
    username: null,
    currentOpenedTab: 'community',
    connectedUsers: [],
    messages: {
      community: {
        'chats': []
      }
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {

    case RESET_MESSAGES_SENT:
    let new_state_3 = { ...state.details }
      new_state_3.connectedUsers.forEach(user => {
        if (user.username === action.payload) {
          user.messagesSent = 0
        }
      })
      return {
        ...state,
        details: {
          ...new_state_3
        }
      }

    case DELETE_USER_INFO:
      let new_state_2 = { ...state.details }
      if (new_state_2.messages[`${action.payload}`]) {
        delete new_state_2.messages[`${action.payload}`]
      }
      return {
        ...state,
        details: {
          ...new_state_2
        }
      }

    case SET_CURRENT_TAB:
      return {
        ...state,
        details: {
          ...state.details,
          currentOpenedTab: action.payload
        }
      }

    case UPDATE_NO:
      let new_state_1 = { ...state.details }
      new_state_1.connectedUsers.forEach(user => {
        if (user.username === action.payload) {
          user.messagesSent += 1
        }
      })
      return {
        ...state,
        details: {
          ...new_state_1
        }
      }

    case SET_ROOM:
      let chat_room = action.payload
      let new_state = { ...state.details }
      new_state.messages[`${chat_room}`] = {}
      new_state.messages[`${chat_room}`]['chats'] = []
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
      newState.messages[chatRoom]['chats'].push(message)
      return {
        ...state,
        details: {
          ...newState
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