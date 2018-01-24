import React from 'react';
import PropTypes from 'prop-types';

import GameHeader from '../GameHeader/GameHeader';
import GameScreen from '../GameScreen/GameScreen';

export default function Game({ state, handleClicks, }) {
  const gameScreenProps = { state, handleClicks, };
  const gameHeaderProps = { state, };
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
