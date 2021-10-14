import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './DashNav.scss';

const DashNav = ({ auth: { user, logout }, activeNav, setActiveNav }) => {
  const toggleDashNav = () => {
    if (!activeNav) {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
  };

  return (
    <div
      className={activeNav ? 'dashnav-container active' : 'dashnav-container'}
    >
      <div className='dashnav-logo-content'>
        <div className='dashnav-logo'>
          <i className='bx bx-code-alt'></i>
          <p className='logo-name'>Guess the Lines</p>
        </div>
        <i className='bx bx-menu dash-btn' onClick={toggleDashNav}></i>
      </div>
      <ul className='dashnav-nav'>
        <li>
          <Link to='/dashboard'>
            <i className='bx bx-grid-alt'></i>
            <span className='link-name'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to='/dashboard/users'>
            <i className='bx bx-user'></i>
            <span className='link-name'>Users</span>
          </Link>
        </li>
        <li>
          <Link to='/dashboard/add'>
            <i className='bx bx-list-plus'></i>
            <span className='link-name'>Add Picks</span>
          </Link>
        </li>
      </ul>
      <div className='profile-content'>
        <div className='profile-details'>
          <p>{user && user.name}</p>
        </div>
        <Link to='/login' onClick={logout}>
          <i className='bx bx-log-out dash-logout'></i>
        </Link>
      </div>
    </div>
  );
};

DashNav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DashNav);
