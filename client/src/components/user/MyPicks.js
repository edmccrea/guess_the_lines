import React from 'react';
import { connect } from 'react-redux';
import './MyPicks.scss';

const MyPicks = ({ picks }) => {
  console.log(picks);
  return (
    <div className='my-picks-container'>
      <div className='my-picks-content'>
        <h2>Total Scores</h2>
        <div className='total-scores'>
          <div className='user-score'>
            <h3>Me</h3>
            <p>2</p>
          </div>
          <div className='bill-score'>
            <h3>Bill</h3>
            <p>5</p>
          </div>
          <div className='sal-score'>
            <h3>Sal</h3>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  picks: state.picks,
});

export default connect(mapStateToProps)(MyPicks);
