const moment = require('moment')

module.exports.getChatRoomId = (a, b) => {
    var str = `${a}${b}`
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

module.exports.createMessage = payload => {
    const { username, message } = payload
    const timeStamp = moment().format('hh:mm:ss A')
    return ({
        username, message, timeStamp
    })
}

module.exports.createUser = username => {
    return ({
        username,
        isTyping: false,
        messagesSent: 0
    })
}

module.exports.deleteUser = (users, userToDelete, userSockets) => {
    users.forEach((user, index, object) => {
        const { username } = user
        if (username === userToDelete) {
            object.splice(index, 1);
            userSockets.splice(index, 1)
        }
    });
    return { users, userSockets }
}

module.exports.findUser = (userSockets, users, usernameToFind, callback) => {
    users.forEach((user, index, object) => {
        const { username } = user
        if (username === usernameToFind) {
            callback(userSockets[index])
        }
    });
}