import React, { Component } from 'react';
import { connect } from 'react-redux'

class Footer extends Component {

  submit = e => {
    e.preventDefault()
    const message = this.message.value
    const { socket } = this.props.details
    const { username } = this.props.details
    socket.emit('SEND_MESSAGE', {
      username, message
    })
    this.message.value = ''
  }

  render() {
    return (
      <footer className="footer" style={{ width: '84%', right: 0 }}>
        <div className="container">
        </div>
        <form style={{ position: 'fixed', width: '83%', bottom: '10px', marginLeft: '15px' }}>
          <div className="form-row">
            <div className="col">
              <input ref={(input) => {this.message = input}} type="text" name='message' className="form-control" placeholder="Type Here......." />
            </div>
            <div style={{ width: '20%' }}>
              <button type="submit" onClick={this.submit} className="btn btn-dark" style={{ float: 'left'}}>Send</button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}

const mapStateToProps = state => (
  {
    details: state.details.details
  }
)

export default connect(mapStateToProps)(Footer)