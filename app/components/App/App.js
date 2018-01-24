import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import findPath from '../../utils/BFS';
import Game from '../Game/Game';
// const Settings = require('./Settings');
// const Results = require('./Results');

function resetBoard(lengthX, lengthY) {
  console.log('creating board');

  const board = [];
  for (let i = 0; i < lengthY; i += 1) {
    board[i] = [];
    for (let j = 0; j < lengthX; j += 1) {
      board[i][j] = {
        isAllowedToBeSteppedOn: true,
        stepVisited: -1,
      };
    }
  }

  return board;
}

function copyBoard(board) {
  return (board.map(row => (row.map(cell => ({ ...cell, })))));
}

export default class App extends React.Component {
  static get defaultProps() {
    return {
      dimensions: {
        x: 12,
        y: 12,
      },
      colors: {
        A: 'red',
        B: 'blue',
        C: 'green',
      },
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      colorA: props.colors.A,
      colorB: props.colors.B,
      colorC: props.colors.C,
      board: resetBoard(props.dimensions.x, props.dimensions.y),
      pathStartingPoint: [],
      pathEndingPoint: [],
      startButtonPressed: false,
      endButtonPressed: false,
      // pathExistsFlag: false, // 'true if a path was found'
      // time: '',
    };

    this.handleClickOnBoard = this.handleClickOnBoard.bind(this);
    this.toggleStartSettingFlag = this.toggleStartSettingFlag.bind(this);
    this.toggleEndSettingFlag = this.toggleEndSettingFlag.bind(this);
    this.toggleCellAllowedToBeSteppedOn = this.toggleCellAllowedToBeSteppedOn.bind(this);
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
      return this.updateStartLocation(x, y);
    }

    if (this.state.endButtonPressed) {
      return this.updateEndLocation(x, y);
    }

    return this.toggleCellAllowedToBeSteppedOn(x, y);
  }

  toggleCellAllowedToBeSteppedOn(x, y) {
    console.log('toggling cell state');
    const { board, } = this.state;
    const boardCopy = copyBoard(board);
    boardCopy[y][x].isAllowedToBeSteppedOn = !this.state.board[y][x].isAllowedToBeSteppedOn;
    console.log('board copy:');
    console.log(boardCopy);
    this.setState({ board: boardCopy, });
  }

  toggleStartSettingFlag() {
    this.setState({
      startButtonPressed: !this.state.startButtonPressed,
      endButtonPressed: false,
    });
  }

  toggleEndSettingFlag() {
    this.setState({
      endButtonPressed: !this.state.endButtonPressed,
      startButtonPressed: false,
    });
  }

  findAndDrawPath() {
    const { pathStartingPoint, pathEndingPoint, board, } = this.state;
    const boardCopy = copyBoard(board);
    const path = findPath(boardCopy, pathStartingPoint, pathEndingPoint);
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
      pathStartingPoint: [ x, y ],
      startButtonPressed: false,
    });
  }

  updateEndLocation(x, y) {
    this.setState(() => ({
      pathEndingPoint: [ x, y ],
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

App.propTypes = {
  dimensions: PropTypes.object,
  colors: PropTypes.object,
};
