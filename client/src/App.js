import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import { getCurrentWeek } from './utils/getCurrentWeek';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/game/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import About from './components/About';
import MyPicks from './components/user/MyPicks';
import Dashboard from './components/admin/Dashboard';
import Alert from './components/layout/Alert';

import AdminRoute from './components/routing/AdminRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState(getCurrentWeek(Date.now()));
  const [games, setGames] = useState(false);
  const [game, setGame] = useState(0);

  useEffect(() => {
    const getWeek = async () => {
      const res = await axios.get(`http://localhost:5000/week/${week}`);
      setGames(res.data[0].games);
      setLoading(false);
      setGame(0);
    };
    getWeek();
  }, [week]);

  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Switch>
            <AdminRoute path='/dashboard' component={Dashboard} />
            <Route
              render={() => (
                <UserRoutes
                  loading={loading}
                  games={games}
                  week={week}
                  setWeek={setWeek}
                  game={game}
                  setGame={setGame}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

const UserRoutes = ({ loading, games, week, setWeek, game, setGame }) => (
  <div className='container'>
    <Navbar />
    <Alert />

    <Route path='/register' render={() => <Register />} />
    <Route path='/login' render={() => <Login />} />
    <Route path='/about' render={() => <About />} />
    <Route path='/mypicks' render={() => <MyPicks />} />

    {!loading ? (
      <Route
        exact
        path='/'
        render={() => (
          <Landing
            games={games}
            week={week}
            setWeek={setWeek}
            game={game}
            setGame={setGame}
          />
        )}
      />
    ) : (
      <div className='loading-container'>
        <p>Loading...</p>
      </div>
    )}
    <Footer />
  </div>
);
