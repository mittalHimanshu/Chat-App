import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">{this.props.username}</a>
          </li>
        </ul>
        <form className="form-inline">
          <button className="btn my-2 my-sm-0 btn-outline-warning" type="submit">Leave Room</button>
        </form>
      </nav>
    );
  }
}



export default Header;