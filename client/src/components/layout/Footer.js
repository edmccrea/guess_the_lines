import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='icon-container'>
        <Link
          to={{
            pathname: 'https://open.spotify.com/show/07SjDmKb9iliEzpNcN2xGD',
          }}
          target='_blank'
        >
          <i className='bx bxl-spotify'></i>
        </Link>
        <Link
          to={{
            pathname:
              'https://podcasts.apple.com/us/podcast/the-bill-simmons-podcast/id1043699613',
          }}
          target='_blank'
        >
          <i className='bx bx-podcast'></i>
        </Link>
        <Link
          to={{ pathname: 'https://twitter.com/BillSimmons' }}
          target='_blank'
        >
          <i className='bx bxl-twitter'></i>
        </Link>
      </div>
      <p>
        Listen to guess the lines on Spotify, Apple or wherever you get your
        podcasts. Bought to you by the Ringer podcast network.
      </p>
    </div>
  );
};

export default Footer;
