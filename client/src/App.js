import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {

  componentWillMount() {
    const { socket } = this.props.details
    socket.on('SHOW_TOAST', toastData => {
      toast.info(toastData);
    })
  }

  render() {
    const { username, socket } = this.props.details
    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover={false}
        />
        <Header username={username} socket={socket} />
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

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps)(App)
