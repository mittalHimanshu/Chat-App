const io = require('./server')
var users = []
var userSockets = []
const { createMessage,
  createUser,
  deleteUser,
  findUser,
  getChatRoomId } = require('./factory')

module.exports = socket => {

  socket.on('SEND_MESSAGE', payload => {
    const msg = createMessage(payload)
    const { chatRoom } = payload
    io.in('community').emit('RECEIVE_MESSAGE', msg, chatRoom)
  })

  socket.on('SEND_PRIVATE_MESSAGE', payload => {
    const msg = createMessage(payload)
    const { chatRoom, username } = payload
    socket.emit('RECEIVE_MESSAGE', msg, chatRoom)
    const chatRoomId = getChatRoomId(a = socket.user, b = chatRoom)
    socket.to(chatRoomId).emit('UPDATE_CHAT', username)
  })

  socket.on('USER_TYPING', payload => {
    console.log(payload)
    io.in('community').emit('USER_TYPING', payload)
  })

  socket.on('USER_NOT_TYPING', payload => {
    console.log(payload)
    io.in('community').emit('USER_NOT_TYPING', payload)
  })

  socket.on('USER_CONNECTED', username => {
    socket.user = username
    socket.join('community')
    const user = createUser(username)
    users.push(user)
    userSockets.push(socket)
    io.in('community').emit('USER_CONNECTED', users)
    io.in('community').emit('SHOW_TOAST', `${username} entered the room`)
  })

  socket.on('disconnect', () => {
    const { user } = socket
    users = deleteUser(users)
    io.in('community').emit('USER_CONNECTED', users)
    io.in('community').emit('SHOW_TOAST', `${user} left the room`)
  })

  socket.on('PRIVATE_CHAT', username => {
    var userSocket = findUser(userSockets, users, username)
    if (userSocket !== null) {
      const chatRoomId = getChatRoomId(a = socket.user, b = userSocket.user)
      socket.join(chatRoomId)
      userSocket.join(chatRoomId)
      socket.emit('CREATE_ROOM', userSocket.user)
      socket.to(chatRoomId).emit('CREATE_ROOM', socket.user)
    }
  })

}