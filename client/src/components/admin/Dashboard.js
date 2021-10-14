import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Dashboard.scss';

import DashNav from './DashNav';
import DashHome from './DashHome';
import Users from './Users';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState(false);

  const [users, setUsers] = useState(false);
  useEffect(() => {
    getAllUsers();
  }, [users]);

  const getAllUsers = async () => {
    const res = await axios.get('/users');
    setUsers(res.data);
  };

  return (
    <Router>
      <div className='dashboard-container'>
        <DashNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <div
          className={
            activeNav ? 'dash-sections dash-sections-active' : 'dash-sections'
          }
        >
          <Switch>
            <Route exact path='/dashboard' render={() => <DashHome />} />
            <Route
              exact
              path='/dashboard/users'
              render={() => <Users users={users} getAllUsers={getAllUsers} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
