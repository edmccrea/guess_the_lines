import React from 'react';
import './UserPicks.scss';
import { useParams } from 'react-router';

const UserPicks = () => {
  let { id } = useParams();
  return (
    <div>
      <h1>ID: {id}</h1>
    </div>
  );
};

export default UserPicks;
