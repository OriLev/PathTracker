import React from 'react';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import GameButtonsPanel from '../GameButtonsPanel/GameButtonsPanel';


export default function GameScreen({ state, handleClicks, }) {
  console.log('in gameScreen');
  const {
    toggleStartButtonPressed,
    toggleEndButtonPressed,
    findAndDrawPath,
    handleClickOnBoard,
  } = handleClicks;
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
  const buttonState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
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
    state: buttonState,
  };
  const boardProps = {
    handleClickOnBoard,
    state: boardState,
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
  state: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
