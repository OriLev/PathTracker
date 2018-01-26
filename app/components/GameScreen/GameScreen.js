import React from 'react';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import GameButtonsPanel from '../GameButtonsPanel/GameButtonsPanel';


export default function GameScreen(props) {
  props = props.props;
  console.log('in gameScreen');
  console.log(props);
  const { board, } = props.state;
  return (
    <div className="gameScreen">
      <div className="boardContainer">
        <Board
          state={ props.state }
          handleClickOnBoard={ props.handleClicks.handleClickOnBoard }
        />
      </div>
      <GameButtonsPanel
        state={ props.state }
        handleClickOnButtons={ {
          toggleStartSettingFlag: props.handleClicks.toggleStartSettingFlag,
          toggleEndSettingFlag: props.handleClicks.toggleEndSettingFlag,
          findAndDrawPath: props.handleClicks.findAndDrawPath,
        } }
      />
    </div>
  );
}
