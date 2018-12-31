import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

class Footer extends Component {

  submit = e => {
    e.preventDefault()
    const message = this.message.value
    const { socket } = this.props.details
    const { username } = this.props.details
    socket.emit('SEND_MESSAGE', {
      username, message
    })
    socket.emit('USER_NOT_TYPING', username)
    this.message.value = ''
  }

  handleTyping = e => {
    const { socket, username } = this.props.details
    if (e.target.value)
      socket.emit('USER_TYPING', username)
    else
      socket.emit('USER_NOT_TYPING', username)
  }

  handleSubmit = e => {
    if(e.key==='Enter'){
      this.submit(e)
    }
  }

  render() {
    return (
      <div className="row">
        <footer className="footer col-sm-12 col-lg-10 col-md-10 col-12" style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: '#f8f9fa', padding: '10px'}}>
          <div className="container">
            <span className="text-muted">
              <div className="row">
                  <input autoFocus onKeyPress={this.handleSubmit} onChange={this.handleTyping} ref={(input) => { this.message = input }} type="text" className="form-control col-lg-10 col-xl-10 col-md-10 col-sm-10 col-10" placeholder="Type Here......." />
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