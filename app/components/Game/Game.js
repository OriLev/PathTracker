import React from 'react';
import PropTypes from 'prop-types';

import GameHeader from '../GameHeader/GameHeader';
import GameScreen from '../GameScreen/GameScreen';

export default function Game(props) {
  return (
    <div className="gameContainer">
      <GameHeader />
      <GameScreen props={ props } />
    </div>
  );
}

module.exports = Game;
