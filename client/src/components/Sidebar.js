import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

class Sidebar extends Component {

  displayCurrentUsers = () => {
    const { connectedUsers } = this.props.details
    return (
      connectedUsers.map(user =>
        <li key={uuid()} className="nav-item" style={{ alignContent: 'space-around', textAlign: 'left', marginTop: 0 }}>
          <div style={{ float: 'left', marginTop: '15px', marginLeft: '16px', fontSize: '15px' }}>{user.username}</div>
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
              <div style={{ textAlign: 'center', fontSize: '15px', fontFamily: 'Andika', marginTop: '5px'}}> Members Online
                <span className="badge badge-info badge-pill " style={{ marginLeft: '8px' }}>{connectedUsers.length}</span>
              </div>
            </li>
            <hr style={{ width: '100%'}}/>
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