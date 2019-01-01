import {
  GET_USER,
  SET_CONNECTED_USERS,
  GET_MESSAGE,
  TYPING,
  UPDATE_NO,
  SET_SOCKET,
  SET_ROOM,
  SET_CURRENT_TAB
} from '../actions'

const initialState = {
  details: {
    socket: null,
    username: null,
    currentOpenedTab: 'community',
    connectedUsers: [],
    messages: {
      'community': {
        noOfMessages: 0,
        'chats': []
      }
    },
    chatRoom: 'community'
  }
}

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_CURRENT_TAB:
      return {
        ...state,
        details:{
          ...state.details,
          currentOpenedTab: action.payload
        }
      }

    case UPDATE_NO:
      let new_state_1 = { ...state.details }
      new_state_1.messages[action.payload].noOfMessages += 1
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
      new_state.messages[chat_room].noOfMessages = 0
      new_state.messages[chat_room].chats = []
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
        newState.messages[chatRoom]['chats'].push(message)
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