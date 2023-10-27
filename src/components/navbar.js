import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-center">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="navbar-right">
        {/* <a className="navbar-brand" href="#">Your Logo</a> */}
        <Link to="/create-ticket" className="button">Create Ticket</Link>
        {/* //<a className="nav-link" href="#">Account Profile</a> */}
      </div>
    </nav>
  );
};

export default Navbar;
