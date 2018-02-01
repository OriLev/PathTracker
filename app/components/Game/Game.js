import React from 'react';
import PropTypes from 'prop-types';

import GameHeader from '../GameHeader/GameHeader';
import GameScreen from '../GameScreen/GameScreen';

export default function Game({
  gameState: {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
    goButtonPressed,
  },
  handleClicks,
}) {
  const gameHeaderState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  };
  const gameScreenState = {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
    goButtonPressed,
  };
  const gameScreenProps = {
    gameScreenState,
    handleClicks,
  };
  const gameHeaderProps = { gameHeaderState, };
  return (
    <div className="gameContainer">
      <GameHeader { ...gameHeaderProps } />
      <GameScreen { ...gameScreenProps } />
    </div>
  );
}

Game.propTypes = {
  gameState: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
