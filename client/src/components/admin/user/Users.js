import React from 'react';
import UserRow from './UserRow';

import './Users.scss';

const Users = ({ users, loading, getAllUsers }) => {
  return (
    <div>
      {!loading ? (
        <div className='users-dash'>
          <h1>Users</h1>
          <div className='users-list'>
            {users.map((user) => (
              <UserRow key={user._id} user={user} getAllUsers={getAllUsers} />
            ))}
          </div>
        </div>
      ) : (
        <div className='loading-container'>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Users;
