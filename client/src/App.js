import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/game/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';

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
  // const [guess, setGuess] = useState(false);
  // const [score, setScore] = useState(false);

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
          <Switch>
            <Route path='/dashboard' render={() => <Dashboard />} />
            <Route
              render={() => <UserRoutes loading={loading} games={games} />}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

const UserRoutes = ({ loading, games }) => (
  <div className='container'>
    <Navbar />

    <Route path='/register' render={() => <Register />} />
    <Route path='/login' render={() => <Login />} />

    {!loading ? (
      <Route path='/' render={() => <Landing games={games} />} />
    ) : (
      <div className='loading-container'>
        <p>Loading...</p>
      </div>
    )}
  </div>
);
