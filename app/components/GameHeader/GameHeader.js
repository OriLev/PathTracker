import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import Instructions from '../Instructions/Instructions';

export default function GameHeader({
  gameHeaderState: {
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
  const instructionsProps = { instructionsState, };
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
  gameHeaderState: PropTypes.object.isRequired,
};
