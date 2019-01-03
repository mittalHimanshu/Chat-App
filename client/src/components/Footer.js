import React, { Component } from 'react';
import { connect } from 'react-redux'

class Footer extends Component {

  submit = e => {
    e.preventDefault()
    const { socket, username, currentOpenedTab } = this.props.details
    socket.emit('USER_NOT_TYPING', { username })
    const message = this.message.value
    if (currentOpenedTab === 'community') {
      socket.emit('SEND_MESSAGE', {
        username, message, chatRoom: currentOpenedTab
      })
    }
    else {
      socket.emit('SEND_PRIVATE_MESSAGE', {
        username, message, chatRoom: currentOpenedTab
      })
    }
    this.message.value = ''
  }

  handleTyping = e => {
    const { socket, username } = this.props.details
    if (e.target.value)
      socket.emit('USER_TYPING', { username })
    else
      socket.emit('USER_NOT_TYPING', { username })
  }

  handleSubmit = e => {
    if (e.key === 'Enter') {
      this.submit(e)
    }
  }

  render() {
    return (
      <div className="row">
        <footer className="footer col-lg-9 col-md-9 col-sm-9 col-9 col-xl-10" style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: '#f8f9fa', padding: '10px' }}>
          <div className="container">
            <span className="text-muted">
              <div className="row">
                <input autoFocus onKeyPress={this.handleSubmit} onChange={this.handleTyping} ref={(input) => { this.message = input }} type="text" placeholder="Type Here......." className="form-control col-xl-10 col-md-10 col-lg-10 col-8 col-sm-9" />
                <button onClick={this.submit} className="btn btn-info float-right col-lg col-md col-sm col" type="submit" style={{ marginLeft: '15px' }}>Send</button>
              </div>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps)(Footer)