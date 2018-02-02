import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import GameInstructions from '../GameInstructions/GameInstructions';

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
    // href: '/settings',
    className: 'settingsLink',
    to: { pathname: '/settings', },
    children: settingsText,
  };
  return (
    <div className="pageHeader">
      <Link { ...linkProps } />
      <div className="instructionsWrapper">
        <GameInstructions { ...instructionsProps } />
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  gameHeaderState: PropTypes.object.isRequired,
};
