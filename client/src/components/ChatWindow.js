import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import { changeConnectedUsers } from '../actions/performAction'

class ChatWindow extends Component {

  componentWillMount() {
    const { socket } = this.props.details
    socket.on('USER_TYPING', username => {
      const { connectedUsers } = this.props.details
      this.props.changeConnectedUsers(connectedUsers, username)
    })
    socket.on('USER_NOT_TYPING', username => {
      const { connectedUsers } = this.props.details
      this.props.changeConnectedUsers(connectedUsers, username, true)
    })
  }

  displayMessages = () => {
    const { chatRoom } = this.props.details
    const { messages } = this.props.details
    var chatMessages
    Object.keys(messages).forEach(key => {
      if (key === chatRoom) {
        chatMessages = messages[key]
      }
    })
    return (
      chatMessages.map(message =>
        <div key={uuid()} className="media text-muted pt-3">
          <img src="http://pinegrow.com/placeholders/img15.jpg" className="mr-2 rounded" width={32} height={32} />
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">
              {message.username}
              <span style={{ position: 'absolute', left: '50%', marginLeft: '-150px', fontWeight: 'normal' }}>
                {message.timeStamp}
              </span>
            </strong>
            {message.message}
          </p>
        </div>
      )
    )
  }



  render() {
    return (
      <main role="main" className="ml-sm-auto col-lg-10 px-4 pl-4 pr-4 pl-0 pb-0 pr-0 pt-null col-md-10">
        <div className="my-3 rounded box-shadow text-justify bg-white pl-3 pb-3 pr-3 pt-3 pl-null pb-null pr-null p-3 mt-auto mb-auto " style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          {this.displayMessages()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps, { changeConnectedUsers })(ChatWindow)