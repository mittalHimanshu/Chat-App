import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { setChatRoom, setCurrentTab } from '../actions/performAction'

class Sidebar extends Component {

  handlePrivateChat = username => {
    const { socket } = this.props.details
    this.props.setCurrentTab(username)
    socket.emit('PRIVATE_CHAT', username)
  }

  displayNoOfChats = user => {
    const { noOfMessages } = this.props.details.messages[user] || '0'
    const { currentOpenedTab } = this.props.details
    const choice = currentOpenedTab === user ? 0 : 1
    return (
      <div>
      {
        choice ? noOfMessages : null
      }
      </div>
    )
}

displayCurrentUsers = () => {
  const { connectedUsers } = this.props.details
  return (
    connectedUsers.map(user =>
      <li key={uuid()} onClick={() => this.handlePrivateChat(user.username)} className="nav-item" style={{ alignContent: 'space-around', textAlign: 'left', marginTop: 0 }}>
        <div style={{ float: 'left', marginTop: '15px', marginLeft: '16px', fontSize: '15px' }}>{user.username}</div>
        {this.displayNoOfChats(user)}
        {user.isTyping ?
          <img src="https://mittalhimanshu151.000webhostapp.com/Images/typing.gif" className="mr-2 rounded" width={50} height={50} style={{ float: 'right' }} />
          : null}
      </li>
    )
  )
}

render() {
  const { connectedUsers } = this.props.details
  return (
    <nav className="col-md-2 d-md-block bg-light sidebar d-none">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <div style={{ textAlign: 'center', fontSize: '15px', fontFamily: 'Andika', marginTop: '5px' }}> Members Online
                <span className="badge badge-info badge-pill " style={{ marginLeft: '8px' }}>{connectedUsers.length}</span>
            </div>
          </li>
          <hr style={{ width: '100%' }} />
          <li key={uuid()} onClick={() => this.handlePrivateChat('community')} className="nav-item" style={{ alignContent: 'space-around', textAlign: 'left', marginTop: 0 }}>
            <div style={{ float: 'left', marginTop: '15px', marginLeft: '16px', fontSize: '15px' }}>COMMUNITY</div>
            <div>{this.displayNoOfChats('community')}</div>
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

export default connect(mapStateToProps, { setChatRoom, setCurrentTab })(Sidebar)