import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserRow = ({ user, getAllUsers }) => {
  const deleteUser = async () => {
    axios.delete(`/users/${user._id}`);
    getAllUsers();
  };
  return (
    <div className='user-row'>
      <div className='user-col'>
        <p className='col-info'>{user.name}</p>
      </div>
      <div className='user-col'>
        <p className='col-info'>{user.email}</p>
      </div>
      <div className='user-col btn-col'>
        <Link to={`/picks/${user.id}`}>
          <p className='col-info user-btn picks-btn'>Picks</p>
        </Link>
      </div>
      <div className='user-col btn-col'>
        <p className='col-info user-btn edit-btn'>Edit</p>
      </div>
      <div className='user-col btn-col'>
        <p className='col-info user-btn delete-btn' onClick={deleteUser}>
          Delete
        </p>
      </div>
    </div>
  );
};

export default UserRow;
