import React, { Component } from 'react';
import '../Form.css'
import { connect } from 'react-redux'
import { connectHandler } from '../handlers'
import io from 'socket.io-client'
import { setUser,updateNoOfChats, setConnecedUsers, setSocket,setChatRoom, setMessages } from '../actions/performAction'
const socketUrl = 'http://localhost:5000'

class Form extends Component {

  componentWillMount() {
    const socket = io(socketUrl)
    socket.on('connect', connectHandler)
    socket.on('RECEIVE_MESSAGE', (message, chatRoom) => {
      this.props.setMessages(message, chatRoom)
    })
    socket.on('USER_CONNECTED', users => {
      this.props.setConnecedUsers(users)
    })
    socket.on('CREATE_ROOM', id => {
      this.props.setChatRoom(id)
    })
    socket.on('UPDATE_CHAT', id => {
      this.props.updateNoOfChats(id)
    })
    this.props.setSocket(socket)
  }

  handleInput = e => {
    this.props.setUser(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username } = this.props.details
    const { socket } = this.props.details
    const user = { username, isTyping: false }
    socket.emit('USER_CONNECTED', user)
    this.props.history.push('/chat-box')
  }

  render() {
    return (
      <div className="container" style={{ maxWidth: '322px', marginTop: '270px' }}>
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <form className="form-inline" onSubmit={this.handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="form-group mx-sm-3">
                <input type="text" onChange={this.handleInput} required autoFocus className="form-control" placeholder="Username" />
              </div>
              <button type="submit" className="btn btn-dark" style={{ marginTop: '19px' }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps, { setUser,updateNoOfChats, setConnecedUsers, setChatRoom, setSocket, setMessages })(Form);