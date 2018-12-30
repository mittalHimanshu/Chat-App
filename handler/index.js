const io = require('../server')
var users = []

module.exports.handleSendMessage = data => {
    io.sockets.emit('RECEIVE_MESSAGE', data)
}

module.exports.handleUserConnected = user => {
    const {id} = require('../SocketManager')
    const {username} = user
    users.push({
        username, id
    })
    io.sockets.emit('USER_CONNECTED', users)
}

module.exports.handleUserTyping = username => {
    io.sockets.emit('USER_TYPING', username)
}

module.exports.handleUserNotTyping = username => {
    io.sockets.emit('USER_NOT_TYPING', username)
}

