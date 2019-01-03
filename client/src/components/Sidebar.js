import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { setChatRoom, setCurrentTab, resetMessagesSent } from '../actions/performAction'

class Sidebar extends Component {

  handlePrivateChat = username => {
    const { socket } = this.props.details
    this.props.setCurrentTab(username)
    this.props.resetMessagesSent(username)
    const { messages } = this.props.details
    if (!messages[username])
      socket.emit('PRIVATE_CHAT', username)
  }

  displayNoOfChats = user => {
    const { messagesSent } = user
    if (messagesSent) {
      return (
        <span className="badge badge-success badge-pill align-middle" style={{ marginLeft: '1vw' }}>
          {messagesSent}
        </span>
      )
    }
    else
      return null
  }


  displayCurrentUsers = () => {
    const { connectedUsers, username } = this.props.details
    return (
      connectedUsers.map(user => {
        if (user.username !== username) {
          return (
            <a key={uuid()} className="nav-link" href='/' onClick={e => e.preventDefault()} style={{ marginTop: '-8px' }}>
              <li className="nav-item" onClick={() => this.handlePrivateChat(user.username)} style={{ alignContent: 'space-around', textAlign: 'left' }}>
                <div style={{ float: 'left', fontSize: '18px', fontFamily: 'Andika' }}>{user.username}</div>
                {this.displayNoOfChats(user)}
                {user.isTyping ?
                  <img src="https://mittalhimanshu151.000webhostapp.com/Images/typing.gif" alt='' className="rounded d-none d-sm-block" width={35} style={{ float: 'right' }} height={35} />
                  : null}
              </li>
            </a>
          )
        }
      })
    )
  }

  render() {
    const { connectedUsers } = this.props.details
    return (
      <nav className="bg-light sidebar d-md-block col-sm-3 d-sm-block d-block col-3 mt-3 mt-sm-auto col-md-3 col-xl-2 col-lg-3" style={{ zIndex: 1 }}>
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <div style={{ textAlign: 'center', fontSize: '20px', fontFamily: 'Andika', marginTop: '3px' }}> Members Online
                <span className="badge badge-info badge-pill " style={{ marginLeft: '8px' }}>
                  {connectedUsers.length}
                </span>
              </div>
              <hr />
            </li>
            <li key={uuid()} onClick={() => this.handlePrivateChat('community')} className="nav-item" style={{ marginTop: '-17px' }}>
              <div className="row">
                <a href='/' onClick={e => e.preventDefault()} className="nav-link active col-sm-12 col-12 ml-2 ml-sm-2" style={{ fontSize: '18px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home d-none d-sm-inline" style={{ marginBottom: '3px' }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Community
                  <span className="badge badge-success badge-pill align-middle d-none" style={{ marginLeft: '1vw' }}>
                    {this.displayNoOfChats('community')}
                  </span>
                </a>
              </div>
            </li>
            {this.displayCurrentUsers()}
          </ul>
        </div>
      </nav>
    );
  }
}


const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps, { setChatRoom, setCurrentTab, resetMessagesSent })(Sidebar)