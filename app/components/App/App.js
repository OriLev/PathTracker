import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
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
        numberOfStepInPath: -1,
      };
    }
  }

  return board;
}

function cloneBoard(board) {
  return (board.map(row => (row.map(cell => ({ ...cell, })))));
}

@autobind
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
    };
  }
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
  }

  setBoardColor(updatedColor, newColor) {
    this.setState(() => {
      const color = {};
      color[updatedColor] = newColor;
      return color;
    });
  }

  setStartLocation(x, y) {
    this.setState({
      pathStartingPoint: [ x, y ],
      startButtonPressed: false,
    });
  }

  setEndLocation(x, y) {
    this.setState(() => ({
      pathEndingPoint: [ x, y ],
      endButtonPressed: false,
    }));
  }

  handleClickOnBoard(x, y) {
    if (this.state.startButtonPressed) {
      return this.setStartLocation(x, y);
    }

    if (this.state.endButtonPressed) {
      return this.setEndLocation(x, y);
    }

    return this.toggleCellAllowedToBeSteppedOn(x, y);
  }

  toggleCellAllowedToBeSteppedOn(x, y) {
    console.log('toggling cell state');
    const { board, } = this.state;
    const boardCopy = cloneBoard(board);
    boardCopy[y][x].isAllowedToBeSteppedOn = !this.state.board[y][x].isAllowedToBeSteppedOn;
    console.log('board copy:');
    console.log(boardCopy);
    this.setState({ board: boardCopy, });
  }

  toggleStartButtonPressed() {
    this.setState({
      startButtonPressed: !this.state.startButtonPressed,
      endButtonPressed: false,
    });
  }

  toggleEndButtonPressed() {
    this.setState({
      endButtonPressed: !this.state.endButtonPressed,
      startButtonPressed: false,
    });
  }

  findAndDrawPath() {
    const { pathStartingPoint, pathEndingPoint, board, } = this.state;
    const boardCopy = cloneBoard(board);
    const findPathParameters = {
      field: boardCopy,
      startPoint: pathStartingPoint,
      endPoint: pathEndingPoint,
    };
    const path = findPath(findPathParameters);
    const stepCounter = -1;
    this.drawPath(path, stepCounter);
  }

  drawPath(pathRemaining, stepNumber) {
    if (pathRemaining.length === 0) {
      return;
    }
    this.addStepToPathOnBoard(pathRemaining[0], stepNumber + 1);
    window.setTimeout(this.drawPath.bind(this, pathRemaining.slice(1), stepNumber + 1), 500);
  }

  addStepToPathOnBoard(step, stepNum) {
    const { board, } = this.state;
    const boardCopy = cloneBoard(board);
    const [ x, y ] = step;
    boardCopy[y][x].numberOfStepInPath	= stepNum;
    this.setState({ board: boardCopy, });
  }
  render() {
    const {
      handleClickOnBoard,
      toggleStartButtonPressed,
      toggleEndButtonPressed,
      findAndDrawPath,
    } = this;
    const handleClicks = {
      handleClickOnBoard,
      toggleStartButtonPressed,
      toggleEndButtonPressed,
      findAndDrawPath,
    };
    const {
      colorA,
      colorB,
      colorC,
      board,
      pathStartingPoint,
      pathEndingPoint,
      startButtonPressed,
      endButtonPressed,
    } = this.state;
    const gameState = {
      colorA,
      colorB,
      colorC,
      board,
      pathStartingPoint,
      pathEndingPoint,
      startButtonPressed,
      endButtonPressed,
    };
    const gameProps = {
      state: gameState,
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
