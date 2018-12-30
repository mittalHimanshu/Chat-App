const {handleSendMessage} = require('./handler')

module.exports = socket => {
    console.log('CLient connected : ', socket.id)
    socket.on('SEND_MESSAGE', handleSendMessage)
}