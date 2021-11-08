import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './About.scss';

const About = ({ auth: { user } }) => {
  return (
    <div className='about-container'>
      <div className='about-content'>
        <h2>About</h2>
        <p>
          Guess the lines is a game that Bill Simmons and Cousin Sal play each
          week during the NFL season each Sunday night on the Bill Simmons
          Podcast. The goal? To get the closest guess to the point spread that
          has been given to each game by Vegas. <br />
          <br />
          Not familiar with betting terms? Don't worry. This game is all about
          predicting what the expected score margin between the two teams is at
          the end of the game. Assigning a team minus points means that that
          team is expected to win by that many points, and the same works vice
          versa. <br />
          <br />
          Bill and Sal will make their picks each week. Make yours and see who
          was the closest to the actual line. Check through your history to see
          how you did the previous weeks and keep up to date with who has the
          most wins throughout the season.
        </p>

        {user ? (
          <p className='about-redirect'>
            Ready to give it a shot? Click <Link to='/'>here.</Link>
          </p>
        ) : (
          <p className='about-redirect'>
            So, what are you waiting for? Sign up{' '}
            <Link to='/register'>here.</Link>
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(About);
