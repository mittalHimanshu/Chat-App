import React, { Component } from 'react';
import '../Form.css'
import { connect } from 'react-redux'
import SocketManager from './SocketManager'
import { setUser, setSocket, resetState } from '../actions/performAction'
import { withRouter } from 'react-router-dom'

class Form extends Component {

  componentWillMount() {
    this.props.resetState()
  }

  handleInput = e => {
    this.props.setUser(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username } = this.props.details
    const { socket } = this.props.details
    socket.emit('USER_CONNECTED', username)
    this.props.history.push('/chat-box')
  }

  render() {
    return (
      <div>
        <SocketManager />
        <div className="container" style={{ maxWidth: '322px', marginTop: '270px' }}>
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <form className="form-inline" onSubmit={this.handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-group mx-sm-3">
                  <input type="text" onChange={this.handleInput} required autoFocus className="form-control" placeholder="Username" />
                </div>
                <button type="submit" className="btn btn-dark" style={{ marginTop: '19px' }}>Submit</button>
              </form>
            </div>
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

export default withRouter(connect(mapStateToProps, { setUser, setSocket, resetState })(Form))