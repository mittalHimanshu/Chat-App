const express = require('express')
const socket = require('socket.io')
const app = express()
const path = require('path')

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
    let url = path.resolve(__dirname, 'client', 'build', 'index.html')
    res.sendFile(url)
})

const server = app.listen(5000, console.log('Server Started'))

const io = module.exports = socket(server)
const SocketManager = require('./SocketManager')
io.on('connection', SocketManager)