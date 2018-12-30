const io = require('../server')

module.exports.handleSendMessage = data => {
    io.sockets.emit('RECEIVE_MESSAGE', data)
}