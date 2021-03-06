import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './DashNav.scss';

const DashNav = ({ auth: { user }, logout, activeNav, setActiveNav, url }) => {
  const toggleDashNav = () => {
    if (!activeNav) {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
  };

  return (
    <div
      className={
        activeNav ? 'dashnav-container active-dash' : 'dashnav-container'
      }
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
          <Link to={url}>
            <i className='bx bx-grid-alt'></i>
            <span className='link-name'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to={`${url}/users`}>
            <i className='bx bx-user'></i>
            <span className='link-name'>Users</span>
          </Link>
        </li>
        <li>
          <Link to={`${url}/game`}>
            <i className='bx bxs-plus-square'></i>
            <span className='link-name'>Add Game</span>
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
