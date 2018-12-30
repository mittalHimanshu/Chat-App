const io = require('../server')

module.exports.handleSendMessage = data => {
    io.sockets.emit('RECEIVE_MESSAGE', data)
}

module.exports.handleUserConnected = user => {
    io.sockets.emit('USER_CONNECTED', user)
}

module.exports.handleUserTyping = username => {
    io.sockets.emit('USER_TYPING', username)
}

module.exports.handleUserNotTyping = username => {
    io.sockets.emit('USER_NOT_TYPING', username)
}

