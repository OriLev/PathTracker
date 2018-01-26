import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Instructions from '../Instructions/Instructions';

export default function GameHeader({ state, }) {
  const settingsText = '<-- Settings';
  const {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  } = state;
  const instructionsState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  };
  const instructionsProps = { state: instructionsState, };
  return (
    <div className="gameHeader">
      <Link
        href="/"
        className="settingsLink"
        to={ {
          pathname: '/',
        } }
      >
        {settingsText}
      </Link>
      <div className="instructionsWrapper">
        <Instructions { ...instructionsProps } />
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  state: PropTypes.object.isRequired,
};
