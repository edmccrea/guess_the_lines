import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './Auth.scss';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='auth-container'>
      <h1>Login</h1>
      <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={(e) => onChange(e)}
        />

        <input type='submit' className='submit-btn' value='Login' />
      </form>
    </div>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
