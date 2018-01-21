import React from 'react';
import PropTypes from 'prop-types';
import * as ReactRouter from 'react-router-dom';
import findPath from '../../utils/BFS';
import Game from '../Game/Game';

const { BrowserRouter, Route, Switch, } = ReactRouter;


// const Settings = require('./Settings');
// const Results = require('./Results');

function boardReset(lengthX, lengthY) {
  console.log('creating board');

  const board = [];
  for (let i = 0; i < lengthY; i += 1) {
    board[i] = [];
    for (let j = 0; j < lengthX; j += 1) {
      board[i][j] = {
        allowed: true,
        stepVisited: -1,
      };
    }
  }

  return board;
}

function copyBoard(board) {
  return (board.map(row => (row.map(cell => ({ ...cell, })))));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorA: props.colors.A,
      colorB: props.colors.B,
      colorC: props.colors.C,
      board: boardReset(props.dimensions.x, props.dimensions.y),
      startingPoint: [], // the position on the board of 'start'
      endingPoint: [], // the position on the board of 'end'
      startButtonPressed: false, // 'true' if the user is in 'choose start point' mode
      endButtonPressed: false, // 'true' if the user is in 'choose end point' mode
      // pathExistsFlag: false, // 'true if a path was found'
      // time: '',
    };

    this.handleClickOnBoard = this.handleClickOnBoard.bind(this);
    this.toggleStartSettingFlag = this.toggleStartSettingFlag.bind(this);
    this.toggleEndSettingFlag = this.toggleEndSettingFlag.bind(this);
    this.toggleAllowedStateOfCell = this.toggleAllowedStateOfCell.bind(this);
    this.findAndDrawPath = this.findAndDrawPath.bind(this);
    this.updateStartLocation = this.updateStartLocation.bind(this);
    this.updateEndLocation = this.updateEndLocation.bind(this);
    this.updatePathOnBoard = this.updatePathOnBoard.bind(this);
    this.updateBoardColorState = this.updateBoardColorState.bind(this);
  }

  updateBoardColorState(updatedColor, newColor) {
    this.setState(() => ({ updatedColor: newColor, }));
  }

  handleClickOnBoard(x, y) {
    if (this.state.startButtonPressed) {
      this.updateStartLocation(x, y);
    } else if (this.state.endButtonPressed) {
      this.updateEndLocation(x, y);
    } else {
      this.toggleAllowedStateOfCell(x, y);
    }
  }

  toggleAllowedStateOfCell(x, y) {
    const { board, } = this.state;
    const boardCopy = copyBoard(board);
    boardCopy[y][x].allowed = !this.state.board[y][x].allowed;
    this.setState({ board: boardCopy, });
  }

  toggleStartSettingFlag() {
    this.setState({ startButtonPressed: !this.state.startButtonPressed, });
  }

  toggleEndSettingFlag() {
    this.setState({ endButtonPressed: !this.state.endButtonPressed, });
  }

  findAndDrawPath() {
    const { startingPoint, endingPoint, board, } = this.state;
    const boardCopy = copyBoard(board);
    const path = findPath(boardCopy, startingPoint, endingPoint);
    const stepCounter = -1;
    this.drawPath(path, stepCounter);
  }

  drawPath(pathRemaining, stepNumber) {
    if (pathRemaining.length === 0) {
      return;
    }
    this.updatePathOnBoard(pathRemaining[0], stepNumber + 1);
    window.setTimeout(this.drawPath.bind(this, pathRemaining.slice(1), stepNumber + 1), 500);
  }

  updateStartLocation(x, y) {
    this.setState({
      startingPoint: [ x, y ],
      startButtonPressed: false,
    });
  }

  updateEndLocation(x, y) {
    this.setState(() => ({
      endingPoint: [ x, y ],
      endButtonPressed: false,
    }));
  }

  updatePathOnBoard(step, stepNum) {
    const { board, } = this.state;
    const boardCopy = copyBoard(board);
    const [ x, y ] = step;
    boardCopy[y][x].stepVisited	= stepNum;
    this.setState({ board: boardCopy, });
  }
  render() {
    const {
      handleClickOnBoard,
      toggleStartSettingFlag,
      toggleEndSettingFlag,
      findAndDrawPath,
    } = this;
    const handleClicks = {
      handleClickOnBoard,
      toggleStartSettingFlag,
      toggleEndSettingFlag,
      findAndDrawPath,
    };
    const gameProps = {
      state: this.state,
      handleClicks,
    };
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <Game { ...gameProps } />
                ) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  dimensions: {
    x: 12,
    y: 12,
  },
  colors: {
    A: 'red',
    B: 'blue',
    C: 'green',
  },
};

App.propTypes = {
  dimensions: PropTypes.object,
  colors: PropTypes.object,
};

module.exports = App;
