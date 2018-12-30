const io = require('./server')
var users = []

module.exports = socket => {

    socket.on('SEND_MESSAGE', data => {
        io.sockets.emit('RECEIVE_MESSAGE', data)
    })

    socket.on('USER_CONNECTED', user => {
        const {id} = socket
        const { username } = user
        socket.user = username
        users.push({
            username, id
        })
        io.sockets.emit('USER_CONNECTED', users)
    })

    socket.on('USER_TYPING', username => {
        io.sockets.emit('USER_TYPING', username)
    })

    socket.on('USER_NOT_TYPING', username => {
        io.sockets.emit('USER_NOT_TYPING', username)
    })

    socket.on('disconnect', () => {
        const {user} = socket
        users.forEach( (item, index, object) => {
            if (item.username === user) {
              object.splice(index, 1);
            }
          });
          io.sockets.emit('USER_CONNECTED', users)
    })
}