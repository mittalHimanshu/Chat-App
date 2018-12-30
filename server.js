const express = require('express')
const socket = require('socket.io')
const app = express()

const server = app.listen(5000, console.log('Server Started'))

const io = module.exports = socket(server)
const SocketManager = require('./SocketManager')
io.on('connection', SocketManager)
