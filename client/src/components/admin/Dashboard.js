import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useRouteMatch } from 'react-router-dom';
import './Dashboard.scss';

import DashNav from './DashNav';
import DashHome from './DashHome';
import Users from './user/Users';
import AddPick from './add/picks/AddPick';
import AddGame from './add/game/AddGame';
import UserPicks from './user/UserPicks';

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const [activeNav, setActiveNav] = useState(false);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState(false);
  useEffect(() => {
    getAllUsers();
  }, [users.length]);

  const getAllUsers = async () => {
    const res = await axios.get('/users');
    setUsers(res.data);
    setLoading(false);
  };

  return (
    <div className='dashboard-container'>
      <DashNav activeNav={activeNav} setActiveNav={setActiveNav} url={url} />
      {!loading ? (
        <div
          className={
            activeNav ? 'dash-sections dash-sections-active' : 'dash-sections'
          }
        >
          <Route path='/picks/:id' users={users} render={() => <UserPicks />} />
          <Route path={`${path}/pick`} render={() => <AddPick />} />
          <Route path={`${path}/game`} render={() => <AddGame />} />
          <Route
            path={`${path}/users`}
            render={() => <Users users={users} getAllUsers={getAllUsers} />}
          />

          <Route exact path={path} render={() => <DashHome />} />
        </div>
      ) : (
        <div
          className={
            activeNav
              ? 'dash-sections dash-sections-active loading-container'
              : 'dash-sections loading-container'
          }
        >
          <p>Loading ...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
