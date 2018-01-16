import findPath from '../utils/BFS';

const React = require('react');
const PropTypes = require('prop-types');
const ReactRouter = require('react-router-dom');

// const Router = ReactRouter.BrowserRouter;
const { BrowserRouter, Route, Switch, } = ReactRouter;
const Game = require('./Game');

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
    const drawPath = (pathRemaining, stepNumber) => {
      if (pathRemaining.length === 0) {
        return;
      }
      this.updatePathOnBoard(pathRemaining[0], stepNumber + 1);
      window.setTimeout(drawPath.bind(null, pathRemaining.slice(1), stepNumber + 1), 500);
    };
    drawPath(path, stepCounter);
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
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <Game
                  state={ this.state }
                  handleClicks={ { ...handleClicks, } }
                />
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
