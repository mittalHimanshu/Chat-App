const {handleSendMessage, handleUserConnected, handleUserTyping, handleUserNotTyping} = require('./handler')

module.exports = socket => {
    module.exports.id = socket.id
    socket.on('SEND_MESSAGE', handleSendMessage)
    socket.on('USER_CONNECTED', handleUserConnected)
    socket.on('USER_TYPING', handleUserTyping)
    socket.on('USER_NOT_TYPING', handleUserNotTyping)
}