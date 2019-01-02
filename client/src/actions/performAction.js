import {
  SET_CONNECTED_USERS,
  TYPING,
  GET_USER,
  GET_MESSAGE,
  SET_SOCKET,
  SET_ROOM,
  UPDATE_NO,
  SET_CURRENT_TAB
} from './index'

export const setUser = payload => {
  return {
    type: GET_USER,
    payload
  }
}

export const setCurrentTab = payload => {
  return {
    type: SET_CURRENT_TAB,
    payload
  }
}

export const updateNoOfChats = payload => {
  return {
    type: UPDATE_NO,
    payload
  }
}

export const setMessages = (message, chatRoom) => {
  return {
    type: GET_MESSAGE,
    payload: {
      message, chatRoom
    }
  }
}

export const setChatRoom = payload => {
  return {
    type: SET_ROOM,
    payload
  }
}

export const setSocket = payload => {
  return {
    type: SET_SOCKET,
    payload
  }
}

export const setConnecedUsers = payload => {
  return {
    type: SET_CONNECTED_USERS,
    payload
  }
}

export const changeConnectedUsers = (connectedUsers, username, extra = false) => {
  connectedUsers.map(user => {
    if (user.username === username)
      if (extra === false)
        user.isTyping = true
      else
        user.isTyping = false
  })
  return {
    type: TYPING,
    payload: connectedUsers
  }
}
