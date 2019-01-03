import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import { changeConnectedUsers } from '../actions/performAction'

class ChatWindow extends Component {

  displayMessages = () => {

    const { currentOpenedTab } = this.props.details
    const { messages } = this.props.details
    const choice = messages[currentOpenedTab]
    const chatMessages = choice ? choice['chats'] : []
    return (
      chatMessages.map(message =>
        <div key={uuid()} className="media text-muted pt-3">
          <img src="http://pinegrow.com/placeholders/img15.jpg" alt className="mr-2 rounded" width={32} height={32} />
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">
              {message.username}
              <span style={{ position: 'absolute', left: '50%', marginLeft: '-150px', fontWeight: 'normal' }} className="ml-sm-auto ml-auto">
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
    const {currentOpenedTab} = this.props.details
    return (
      <main role="main" className="px-4 pl-4 pr-4 pl-0 pb-0 pr-0 pt-null col-sm-9 ml-sm-auto ml-auto col-9 col-md-9 col-lg-9 col-xl-10">
        <div className="my-3 rounded box-shadow text-justify bg-white pl-3 pb-3 pr-3 pt-3 pl-null pb-null pr-null p-3 mt-auto mb-auto" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <h1 style={{ fontFamily: 'Andika', fontSize: '27px', textAlign: 'center' }}>{currentOpenedTab}</h1>
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