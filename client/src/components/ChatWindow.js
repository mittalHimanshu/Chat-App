import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'

class ChatWindow extends Component {

  displayMessages = () => {
    const { messages } = this.props.details
    return (
      messages.map(message =>
        <div key={uuid()} className="media text-muted pt-3">
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">{message.username}</strong>
            {message.message}
          </p>
        </div>
      )
    )
  }

  render() {
    return (
      <main role="main" className="ml-sm-auto col-lg-10 px-4 col-md-10 col-sm-10 col-10 p-5 ml-auto">
        <main role="main" className="container">
          <div className="my-3 p-3 bg-white rounded box-shadow">
            {this.displayMessages()}
          </div>
        </main>
      </main>
    );
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps)(ChatWindow)