import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Dashboard.scss';

import DashNav from './DashNav';
import DashHome from './DashHome';
import Users from './Users';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState(false);
  return (
    <div className='dashboard-container'>
      <DashNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <div
        className={
          activeNav ? 'dash-sections dash-sections-active' : 'dash-sections'
        }
      >
        <Router>
          <Route exact path='/dashboard' render={() => <DashHome />} />
          <Route exact path='/dashboard/users' render={() => <Users />} />
        </Router>
      </div>
    </div>
  );
};

export default Dashboard;
