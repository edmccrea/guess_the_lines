import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './Navbar.scss';

const Navbar = ({ auth: { user, isAuthenticated }, logout }) => {
  const guestLinks = (
    <Fragment>
      <Link to='/register'>
        <li>Sign Up</li>
      </Link>
      <Link to='/login' className='login-btn'>
        <li>Login</li>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Link to='/mypicks'>
        <li>My Picks</li>
      </Link>
      <Link to='/login' className='login-btn' onClick={logout}>
        <li>Logout</li>
      </Link>
    </Fragment>
  );

  const adminLinks = (
    <Link to='/dashboard'>
      <li>Admin Dashboard</li>
    </Link>
  );
  return (
    <div className='navbar'>
      <div className='logo'>
        <Link to='/'>
          <i className='bx bx-code-alt'></i>
        </Link>
        {isAuthenticated && user && user.role === 'admin' ? adminLinks : ''}
      </div>
      <ul>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
