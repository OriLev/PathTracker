import React from 'react';
import PropTypes from 'prop-types';

import GameHeader from '../GameHeader/GameHeader';
import GameScreen from '../GameScreen/GameScreen';

export default function Game({ state, handleClicks, }) {
  const {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  } = state;
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
  };
  const gameScreenProps = {
    state: gameScreenState,
    handleClicks,
  };
  const gameHeaderProps = { state: gameHeaderState, };
  return (
    <div className="gameContainer">
      <GameHeader { ...gameHeaderProps } />
      <GameScreen { ...gameScreenProps } />
    </div>
  );
}

Game.propTypes = {
  state: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
