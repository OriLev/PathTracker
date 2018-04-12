import React from 'react';
import PropTypes from 'prop-types';
import { autobind, } from 'core-decorators';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import findPath from '../../utils/BFS';
import Game from '../Game/Game';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
// TODO: add a results page
// const Results = require('./Results');

function createBoard(lengthX, lengthY) {
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

export default class App extends React.Component {
  static get defaultProps() {
    return {
      dimensions: {
        x: 12,
        y: 12,
      },
      colors: {
        A: '#ff0000',
        B: '#0000ff',
        C: '#00ff00',
      },
    };
  }
  constructor(props) {
    super(props);
    const { colors, dimensions, } = props;
    const { A: colorA, B: colorB, C: colorC, } = colors;
    const { x: lengthX, y: lengthY, } = dimensions;
    this.state = {
      colorA,
      colorB,
      colorC,
      board: createBoard(lengthX, lengthY),
      pathStartingPoint: [],
      pathEndingPoint: [],
      startButtonPressed: false,
      endButtonPressed: false,
      goButtonPressed: false,
      // pathExistsFlag: false, // 'true if a path was found'
      // time: '',
    };
  }

  @autobind
  resetBoard() {
    const { x: lengthX, y: lengthY, } = this.props.dimensions;
    this.setState({ board: createBoard(lengthX, lengthY)});
  }

  @autobind
  setBoardColor(colorName, colorValue) {
    this.setState({ [colorName]: colorValue, });
  }

  setStartLocation(x, y) {
    this.setState({
      pathStartingPoint: [ x, y ],
      startButtonPressed: false,
    });
  }

  setEndLocation(x, y) {
    this.setState({
      pathEndingPoint: [ x, y ],
      endButtonPressed: false,
    });
  }

  @autobind
  handleClickOnBoard(x, y) {
    const { startButtonPressed, endButtonPressed, } = this.state;
    if (startButtonPressed) {
      return this.setStartLocation(x, y);
    }

    if (endButtonPressed) {
      return this.setEndLocation(x, y);
    }

    return this.toggleIsCellAllowedToBeSteppedOn(x, y);
  }

  toggleIsCellAllowedToBeSteppedOn(x, y) {
    console.log('toggling cell state');
    const { board, } = this.state;
    const boardCopy = cloneBoard(board);
    boardCopy[y][x].isAllowedToBeSteppedOn = !this.state.board[y][x].isAllowedToBeSteppedOn;
    console.log('board copy:');
    console.log(boardCopy);
    this.setState({ board: boardCopy, });
  }

  @autobind
  toggleStartButtonPressed() {
    this.setState({
      startButtonPressed: !this.state.startButtonPressed,
      endButtonPressed: false,
    });
  }

  @autobind
  toggleEndButtonPressed() {
    this.setState({
      endButtonPressed: !this.state.endButtonPressed,
      startButtonPressed: false,
    });
  }

  @autobind
  findAndDrawPath() {
    this.setState({ goButtonPressed: true, });
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
      resetBoard,
      handleClickOnBoard,
      toggleStartButtonPressed,
      toggleEndButtonPressed,
      findAndDrawPath,
      setBoardColor,
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
      goButtonPressed,
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
      goButtonPressed,
    };
    const gameProps = {
      resetBoard,
      gameState,
      handleClicks,
      
    };
    const settingsProps = {
      colorA,
      colorB,
      colorC,
      setBoardColor,
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
            <Route
              exact
              path="/settings"
              render={ () => (
                <SettingsScreen { ...settingsProps } />
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
