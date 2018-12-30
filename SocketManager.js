const {handleSendMessage, handleUserConnected, handleUserTyping, handleUserNotTyping} = require('./handler')
const io = require('./server')

module.exports = socket => {
    console.log('client : ', io.sockets.clients())
    console.log('CLient connected : ', socket.id)
    socket.on('SEND_MESSAGE', handleSendMessage)
    socket.on('USER_CONNECTED', handleUserConnected)
    socket.on('USER_TYPING', handleUserTyping)
    socket.on('USER_NOT_TYPING', handleUserNotTyping)
}