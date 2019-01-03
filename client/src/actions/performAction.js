import {
  SET_CONNECTED_USERS,
  TYPING,
  GET_USER,
  DELETE_USER_INFO,
  GET_MESSAGE,
  SET_SOCKET,
  SET_ROOM,
  UPDATE_NO,
  SET_CURRENT_TAB,
  RESET_MESSAGES_SENT,
  RESET_STATE
} from './index'

export const setUser = payload => {
  return {
    type: GET_USER,
    payload
  }
}

export const resetState = () => {
  return {
    type: RESET_STATE
  }
}

export const resetMessagesSent = payload => {
  return {
    type: RESET_MESSAGES_SENT,
    payload
  }
}

export const updateView = payload => (dispatch, getState) => {
  const { currentOpenedTab } = getState().details.details
  if (currentOpenedTab === payload) {
    dispatch({
      type: SET_CURRENT_TAB,
      payload: 'community'
    })
  }
}

export const deleteUserInfo = payload => {
  return {
    type: DELETE_USER_INFO,
    payload
  }
}

export const setCurrentTab = payload => {
  return {
    type: SET_CURRENT_TAB,
    payload
  }
}

export const updateNoOfChats = payload => (dispatch, getState) => {
  const { currentOpenedTab } = getState().details.details
  if (currentOpenedTab !== payload) {
    dispatch({
      type: UPDATE_NO,
      payload
    })
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

export const changeConnectedUsers = (username, extra = false) => (dispatch, getState) => {
  const { connectedUsers } = getState().details.details
  connectedUsers.forEach(user => {
    if (user.username === username)
      if (extra === false)
        user.isTyping = true
      else
        user.isTyping = false
  })
  dispatch({
    type: TYPING,
    payload: connectedUsers
  })
}
