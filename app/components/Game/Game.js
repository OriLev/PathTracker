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
  const instructionsProps = { instructionsState, };
  const Instructions = (
    <div className="instructionsWrapper" key="2">
      <GameInstructions { ...instructionsProps } />
    </div>
  );
  const settingsLinkProps = {
    className: 'settingsLink',
    to: { pathname: '/settings', },
    children: '<-- Settings',
    key: 1,
  };
  const SettingsLink = <Link { ...settingsLinkProps } />;
  const gameHeaderProps = { children: [ SettingsLink, Instructions ], };
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
      <HeaderSection { ...gameHeaderProps } />
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
