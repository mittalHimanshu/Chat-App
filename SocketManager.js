const {handleSendMessage, handleUserConnected} = require('./handler')

module.exports = socket => {
    console.log('CLient connected : ', socket.id)
    socket.on('SEND_MESSAGE', handleSendMessage)
    socket.on('USER_CONNECTED', handleUserConnected)
}