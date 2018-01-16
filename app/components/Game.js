const React = require('react');
const PropTypes = require('prop-types');
const { Link, } = require('react-router-dom');

function Cell(props) {
  // console.log('props Cell:')
  // console.log(props)

  const { x, y, } = props.cellData;
  props = props.props;
  const {
    board, colorA, colorB, colorC, startingPoint, endingPoint,
  } = props.state;
  const lengthY = board.length;
  // const styles = {
  // 	cell: {
  // 		backgroundColor:
  // 	}
  // }

  return (
    <div
      className="cellShell"
      style={ { height: `${40 / lengthY}vh`, width: `${40 / lengthY}vh`, } }
    >
      <div
        className="cell"
        style={ {
backgroundColor:
											(board[y][x].stepVisited >= 0) ? colorC : (board[y][x].allowed ? colorA : colorB),

        } }
        onClick={ props.handleClickOnBoard.bind(null, x, y) }
      >
        {(startingPoint[0] === x) && (startingPoint[1] === y) && <div>start</div>}
        {(endingPoint[0] === x) && (endingPoint[1] === y) && <div>end</div>}
      </div>
    </div>
  );
}

function Row(props) {
  // console.log('props Row: ')
  // console.log(props)
  const { row, indexY, } = props;
  props = props.props;
  return (
    <div className="row">
      {row.map((cell, indexX) => (
        <Cell
          key={ `cell${indexY}${indexX}` }
          cellData={ {
              x: indexX,
              y: indexY,
            } }
          props={ props }
        />
        ))}
    </div>
  );
}
function Board(props) {
  console.log('props Board: ');
  console.log(props);
  const board = props.state.board;
  return (
    <div className="board">
      {board.map((row, indexY) => (
        <Row
          key={ `row${indexY}` }
          indexY={ indexY }
          row={ row }
          props={ props }
        />
        ))}
    </div>
  );
}

function GameHeader(props) {
  const settingsText = '<-- Settings';
  return (
    <div className="instructionsContainer">
      <Link
        className="settingsLink"
        to={ {
          pathname: '/',
        } }
      >
        {settingsText}
      </Link>
      <h1 className="instructions"> instructions to be here </h1>
    </div>
  );
}

function ButtonGroup(props) {
  const { buttons, } = props;
  const buttonHeight = {
    style: {
      height: `${100 / props.buttons.length}%`,
    },
  };

  return (
    <div className="btnGrp">
      {
        buttons.map((button, index) => {
          const {
 text, classes, disabled, onClick,
} = button;
          return (
            <button
              type="button"
              disabled={ disabled }
              key={ `button${index}` }
              className={ classes }
              style={ buttonHeight.style }
              onClick={ onClick }
            >
              {text}
            </button>
          );
        })
      }
    </div>
  );
}

function GameButtonsPanel(props) {
  const {
    startingPoint, endingPoint, startButtonPressed, endButtonPressed,
  } = props.state;
  const checkIfDisabled = (location) => {
    if (location.length > 0) {
      return true;
    }
    return false;
  };
  const buttons = [
    {
      text: 'Start',
      classes: `btn${startButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(startingPoint),
      onClick: props.handleClickOnButtons.toggleStartSettingFlag,
    },
    {
      text: 'End',
      classes: `btn${endButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(endingPoint),
      onClick: props.handleClickOnButtons.toggleEndSettingFlag,
    },
    {
      text: 'Go!',
      classes: 'btn success',
      disabled: (!checkIfDisabled(startingPoint) || !checkIfDisabled(endingPoint)),
      onClick: props.handleClickOnButtons.findAndDrawPath,
    },
  ];
  console.log('buttons ok');

  return (
    <div className="buttonsPanel">
      <ButtonGroup
        buttons={ buttons }
      />
    </div>
  );
}

function GameScreen(props) {
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

function Game(props) {
  return (
    <div className="gameContainer">
      <GameHeader />
      <GameScreen props={ props } />
    </div>
  );
}

module.exports = Game;
