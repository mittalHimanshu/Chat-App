const io = require('./server')
var users = []
var userSockets = []
const moment = require('moment')

const getChatRoomId = (a, b) => {
    var str = `${a}${b}`
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

module.exports = socket => {

    socket.on('SEND_MESSAGE', data => {
        data[0]['timeStamp'] = moment().format('hh:mm:ss A')
        io.sockets.emit('RECEIVE_MESSAGE', data[0], data[1])
        io.to(data[1]).emit('UPDATE_CHAT', data[1])
    })

    socket.on('PRIVATE_CHAT', username => {
        var userSocket;
        users.forEach((item, index, object) => {
            if (item.username === username) {
                userSocket = userSockets[index]
            }
        });
        if (userSocket) {
            const chatRoomId = getChatRoomId(a = socket.user, b = userSocket.user)
            socket.join(chatRoomId)
            userSocket.join(chatRoomId)
            socket.emit('CREATE_ROOM', chatRoomId)
        }
    })

    socket.on('USER_CONNECTED', user => {
        const { username } = user
        socket.user = username
        socket.join('community')
        users.push({
            username
        })
        userSockets.push(socket)
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
                userSockets.splice(index, 1)
            }
        });
        io.sockets.emit('USER_CONNECTED', users)
        if (user)
            io.sockets.emit('SHOW_TOAST', `${user} left the room`)
    })
}