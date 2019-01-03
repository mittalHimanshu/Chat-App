import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {

  handleLogout = e => {
    this.props.socket.disconnect()
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top p-auto">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">{this.props.username}</a>
          </li>
        </ul>
          <Link to='/'><button className="btn my-2 my-sm-0 btn-outline-warning" onClick={this.handleLogout} type="button">Leave Room</button></Link>
      </nav>
    );
  }
}



export default Header;