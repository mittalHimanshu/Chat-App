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
