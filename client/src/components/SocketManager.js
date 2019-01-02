import { Component } from 'react';
import {
    setUser,
    updateNoOfChats,
    setConnecedUsers,
    changeConnectedUsers,
    setSocket,
    setChatRoom,
    setMessages
} from '../actions/performAction'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socketUrl = 'http://localhost:5000'

class SocketManager extends Component {

    componentWillMount() {

        const socket = io(socketUrl)
        this.props.setSocket(socket)

        socket.on('connect', () => {
            console.log('Client Connected')
        })

        socket.on('RECEIVE_MESSAGE', (message, chatRoom) => {
            this.props.setMessages(message, chatRoom)
        })

        socket.on('USER_CONNECTED', users => {
            this.props.setConnecedUsers(users)
        })

        socket.on('CREATE_ROOM', id => {
            this.props.setChatRoom(id)
        })

        socket.on('UPDATE_CHAT', username => {
            this.props.updateNoOfChats(username)
        })

        socket.on('USER_TYPING', payload => {
            this.props.changeConnectedUsers(
                payload.connectedUsers,
                payload.username 
            )
        })

        socket.on('USER_NOT_TYPING', payload => {
            this.props.changeConnectedUsers(
                payload.connectedUsers,
                payload.username,
                true
            )
        })
    }

    render() {
        return (
            null
        );
    }
}

const mapStateToProps = state => (
    {
        details: state.details.details
    }
)

export default connect(mapStateToProps, {
    setUser,
    updateNoOfChats,
    changeConnectedUsers,
    setConnecedUsers,
    setSocket,
    setChatRoom,
    setMessages
})(SocketManager)