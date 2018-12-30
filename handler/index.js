const io = require('../server')

module.exports.handleSendMessage = data => {
    io.sockets.emit('RECEIVE_MESSAGE', data)
}

module.exports.handleUserConnected = user => {
    io.sockets.emit('USER_CONNECTED', user)
}