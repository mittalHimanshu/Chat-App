import React, { Component } from 'react';
import { connect } from 'react-redux'
import { connectHandler } from './handlers'
import { setUser, setMessages, setSocket } from './actions/performAction'
import './App.css';
import io from 'socket.io-client'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Footer from './components/Footer'

const socketUrl = 'http://localhost:5000'

class App extends Component {

  componentWillMount() {
    const socket = io(socketUrl)
    socket.on('connect', connectHandler)
    socket.on('RECEIVE_MESSAGE', message => {
      const msg = message.message
      this.props.setMessages(msg)
    })
    this.props.setSocket(socket)
  }

  handleInput = e => {
    this.props.setUser(e.target.value)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <ChatWindow />
            <Footer />
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

export default connect(mapStateToProps, { setUser, setMessages, setSocket })(App)
