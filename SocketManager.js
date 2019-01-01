const io = require('./server')
var users = []
const moment = require('moment')

const getChatRoomId = (a, b) => {
    var str = `${a}${b}`
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

module.exports = socket => {

    console.log('him', socket.id)

    socket.on('SEND_MESSAGE', data => {
        data[0]['timeStamp'] = moment().format('hh:mm:ss A')
        io.sockets.emit('RECEIVE_MESSAGE', data[0], data[1])
    })

    socket.on('PRIVATE_CHAT', username => {
        var id;
        users.forEach((item, index, object) => {
            if (item.username === username) {
               id = item.id 
            }
        });

        console.log('ag', id)
        const chatRoomId = getChatRoomId(a=socket.id, b=id)
        socket.emit('PRIVATE_CHAT', chatRoomId)
        io.to(id).emit('PRIVATE_CHAT', chatRoomId)

    })

    socket.on('USER_CONNECTED', user => {
        const { id } = socket
        const { username } = user
        socket.user = username
        users.push({
            username, id
        })
        io.sockets.emit('USER_CONNECTED', users)
        io.sockets.emit('SHOW_TOAST', `${username} entered the room`)
    })

    socket.on('USER_TYPING', username => {
        io.sockets.emit('USER_TYPING', username)
    })

    socket.on('USER_NOT_TYPING', username => {
        io.sockets.emit('USER_NOT_TYPING', username)
    })

    socket.on('disconnect', () => {
        const { user } = socket
        users.forEach((item, index, object) => {
            if (item.username === user) {
                object.splice(index, 1);
            }
        });
        io.sockets.emit('USER_CONNECTED', users)
        if (user)
            io.sockets.emit('SHOW_TOAST', `${user} left the room`)
    })
}