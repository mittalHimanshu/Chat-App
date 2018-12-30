import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setUser, setMessages, setSocket } from './actions/performAction'
import './App.css';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Footer from './components/Footer'

class App extends Component {

  render() {
    console.log('hie')
    const { username } = this.props.details
    if (!username)
      this.props.history.push('/')
    else {
      return (
        <div>
          <Header username={username} />
          <div className="container-fluid">
            <div className="row">
              <Sidebar />
              <ChatWindow />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps, { setUser, setMessages, setSocket })(App)
