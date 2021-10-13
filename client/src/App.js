import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/game/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';

import AdminRoute from './components/routing/AdminRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(false);
  const [guess, setGuess] = useState(false);
  const [score, setScore] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      const res = await axios.get('http://localhost:5000/games');
      setGames(res.data);
      setLoading(false);
    };
    getGames();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Route exact path='/dashboard' render={() => <Dashboard />} />
          <Fragment>
            <Navbar />
            {!loading ? (
              <Route exact path='/' render={() => <Landing games={games} />} />
            ) : (
              <p>Loading...</p>
            )}
            <Route exact path='/register' render={() => <Register />} />
            <Route exact path='/login' render={() => <Login />} />
          </Fragment>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
