import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import Instructions from '../Instructions/Instructions';

export default function GameHeader({
  state: {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  },
}) {
  const settingsText = '<-- Settings';
  const instructionsState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  };
  const instructionsProps = { state: instructionsState, };
  const linkProps = {
    href: '/',
    className: 'settingsLink',
    to: { pathname: '/', },
    children: settingsText,
  };
  return (
    <div className="gameHeader">
      <Link { ...linkProps } />
      <div className="instructionsWrapper">
        <Instructions { ...instructionsProps } />
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  state: PropTypes.object.isRequired,
};
