import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import './Auth.scss';

const Register = ({ isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      register({ name, email, password });

      setFormData({ name: '', email: '', password: '', password2: '' });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='auth-container'>
      <h1>Sign Up</h1>
      <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          name='name'
          value={name}
          placeholder='Name'
          onChange={(e) => onChange(e)}
        />
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
        <input
          type='password'
          name='password2'
          value={password2}
          placeholder='Confirm Password'
          onChange={(e) => onChange(e)}
        />

        <input type='submit' className='submit-btn' value='Register' />
      </form>
      <p className='redirect-link'>
        Already have an account? Login <Link to='/login'>here</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
