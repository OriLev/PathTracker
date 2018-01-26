import React from 'react';
import PropTypes from 'prop-types';

const { Link, } = require('react-router-dom');

export default function GameHeader(props) {
  const settingsText = '<-- Settings';
  return (
    <div className="instructionsContainer">
      <Link
        className="settingsLink"
        to={ {
          pathname: '/',
        } }
      >
        {settingsText}
      </Link>
      <h1 className="instructions"> instructions to be here </h1>
    </div>
  );
}
