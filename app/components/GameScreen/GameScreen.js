import React from 'react';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import GameButtonsPanel from '../GameButtonsPanel/GameButtonsPanel';


export default function GameScreen({
  gameScreenState: {
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
  handleClicks: {
    toggleStartButtonPressed,
    toggleEndButtonPressed,
    findAndDrawPath,
    handleClickOnBoard,
  },
}) {
  console.log('in gameScreen');
  const buttonsState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
    goButtonPressed,
  };
  const boardState = {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
  };
  const buttonPanelProps = {
    toggleStartButtonPressed,
    toggleEndButtonPressed,
    findAndDrawPath,
    buttonsState,
  };
  const boardProps = {
    handleClickOnBoard,
    boardState,
  };
  return (
    <div className="gameScreen">
      <div className="boardContainer">
        <Board { ...boardProps } />
      </div>
      <GameButtonsPanel { ...buttonPanelProps } />
    </div>
  );
}

GameScreen.propTypes = {
  gameScreenState: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
