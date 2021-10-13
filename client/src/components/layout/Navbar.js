import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './Navbar.scss';

const Navbar = ({ auth: { user, isAuthenticated, logout } }) => {
  const userCheck = () => {
    console.log(user.role);
  };

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
    <Link to='/login' className='login-btn' onClick={logout}>
      <li>Logout</li>
    </Link>
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
        {user && user.role === 'admin' ? adminLinks : ''}
      </div>
      <ul>
        <Link to='/'>
          <li>Multiplayer</li>
        </Link>
        <Link to='/'>
          <li onClick={userCheck}>You vs The Boys</li>
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
