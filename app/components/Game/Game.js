import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import GameInstructions from '../GameInstructions/GameInstructions';
import PageHeader from '../PageHeader/PageHeader';
import PageMain from '../PageMain/PageMain';
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
  const instructions = (
    <div className="instructionsWrapper" key="2">
      <GameInstructions { ...instructionsProps } />
    </div>
  );
  const settingsText = '<-- Settings';
  const linkProps = {
    className: 'settingsLink',
    to: { pathname: '/settings', },
    children: settingsText,
    key: 1,
  };
  const settingsLink = <Link { ...linkProps } />;
  const gameHeaderProps = { children: [ settingsLink, instructions ], };
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
    key: 2,
  };
  const boardProps = {
    handleClickOnBoard,
    boardState,
  };
  const BoardContainer = () => (
    <div className="boardContainer" key="1">
      <Board { ...boardProps } />
    </div>
  );
  const buttonsPanel = <GameButtonsPanel { ...buttonPanelProps } />;
  const pageMainProps = { children: [ BoardContainer(), buttonsPanel ], };
  return (
    <div className="gameContainer">
      <PageHeader { ...gameHeaderProps } />
      <PageMain { ...pageMainProps } />
    </div>
  );
}

Game.propTypes = {
  gameState: PropTypes.object.isRequired,
  handleClicks: PropTypes.object.isRequired,
};
