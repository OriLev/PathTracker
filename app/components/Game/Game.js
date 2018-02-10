import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import GameInstructions from '../GameInstructions/GameInstructions';
import HeaderSection from '../HeaderSection/HeaderSection';
import MainSection from '../MainSection/MainSection';
import Board from '../Board/Board';
import GameButtonsPanel from '../GameButtonsPanel/GameButtonsPanel';

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
  handleClicks: {
    handleClickOnBoard,
    toggleStartButtonPressed,
    toggleEndButtonPressed,
    findAndDrawPath,
  },
}) {
  const instructionsState = {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  };
  const settingsLinkProps = {
    className: 'settingsLink',
    to: { pathname: '/settings', },
  };
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
    <div className="gameContainer">
      <HeaderSection>
        <Link { ...settingsLinkProps }>
          {'<-- Settings'}
        </Link>
        <div className="instructionsWrapper" key="2">
          <GameInstructions instructionsState={ instructionsState } />
        </div>
      </HeaderSection>
      <MainSection>
        <div className="boardContainer" >
          <Board { ...boardProps } />
        </div>
        <GameButtonsPanel { ...buttonPanelProps } />
      </MainSection>
    </div>
  );
}

Game.propTypes = {
  gameState: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
