import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

class Sidebar extends Component {

  displayCurrentUsers = () => {
    const { connectedUsers } = this.props.details
    return (
      connectedUsers.map(user =>
        <li key={uuid()} className="nav-item" style={{ fontSize: '19px' }}>
          <a className="nav-link">
            {user.username}
            {user.isTyping ?
              <p style={{ color: '#373738', fontSize: '12px', textAlign: 'right', fontStyle: 'italic', marginTop: '-7px' }}
              >is typing........</p>
            : null}
          </a>
          <hr />
        </li>
      )
    )
  }

  render() {
    return (
      <nav className="col-md-2 d-md-block bg-light sidebar d-block col-2">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
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

export default connect(mapStateToProps)(Sidebar)