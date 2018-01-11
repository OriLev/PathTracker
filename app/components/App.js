import findPath from '../utils/BFS'
const React = require('react')
const PropTypes = require('prop-types')
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch
const Game = require('./Game')

// const findPath = require('../utils/BFS');
// const Settings = require('./Settings');
// const Results = require('./Results');

function boardReset (lengthX, lengthY) {
  console.log('creating board')

  const board = []
  for (let i = 0; i < lengthY; i++) {
    board[i] = []
    for (let j = 0; j < lengthX; j++) {
      board[i][j] = {
        allowed: true,
        stepVisited: -1,
      }
    }
  }

  return board
}

function copyBoard(board) {
  return (board.map(row => (row.map(cell => ({ ...cell, })))))
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      colorA: props.colors.A,
      colorB: props.colors.B,
      colorC: props.colors.C,
      board: boardReset(props.dimensions.x, props.dimensions.y),
      start: [], // the position on the board of 'start'
      end: [], // the position on the board of 'end'
      startFlag: false, // 'true' if the user is in 'choose start point' mode
      endFlag: false, // 'true' if the user is in 'choose end point' mode
      pathExistsFlag: false, // 'true if a path was found'
      time: '',
    }

    this.handleClickOnBoard = this.handleClickOnBoard.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleEndClick = this.handleEndClick.bind(this)
    this.handleGoClick = this.handleGoClick.bind(this)
    this.updateStartLocation = this.updateStartLocation.bind(this)
    this.updateEndLocation = this.updateEndLocation.bind(this)
    this.updatePath = this.updatePath.bind(this)
  }

  handleClickOnBoard (x, y) {
    console.log('trying to update state')
    const { board, } = this.state
    if (this.state.startFlag) {
      this.updateStartLocation(x, y)
    } else if (this.state.endFlag) {
      this.updateEndLocation(x, y)
    } else {
      const tempBoard = board.map((row) => {
        return row.map((cell) => Object.assign({}, cell))
      })
      tempBoard[y][x].allowed = !this.state.board[y][x].allowed
      console.log(tempBoard)
      this.setState(() => {
        return {
          board: tempBoard,
        }
      })
    }
  }

  handleStartClick () {
    this.setState(() => {
      return {
        startFlag: !this.state.startFlag,
      }
    })
  }

  handleEndClick () {
    this.setState(() => {
      return {
        endFlag: !this.state.endFlag,
      }
    })
  }

  handleGoClick () {
    // console.log('go pressed!')
    const { start, end, board, } = this.state
    const boardCopy = board.map((row) => {
      return row.map((cell) => Object.assign({}, cell))
    })
    const path = findPath(boardCopy, start, end)
    const step = -1
    const addSteps = (path, step) => {
      if (path.length === 0) {
        return
      }
      this.updatePath(path[0], step + 1)
      window.setTimeout(addSteps.bind(null, path.slice(1), step + 1), 500)
    }
    addSteps(path, step)
  }

  updateStartLocation (x, y) {
    this.setState(() => {
      return {
        start: [x, y],
        startFlag: false,
      }
    })
  }

  updateEndLocation (x, y) {
    this.setState(() => {
      return {
        end: [x, y],
        endFlag: false,
      }
    })
  }

  updatePath (step, stepNum) {
    const board = this.state.board
    const tempBoard = board.map((row) => {
      return row.map((cell) => Object.assign({}, cell))
    })
    const [x, y] = step
    tempBoard[y][x].stepVisited	= stepNum

    this.setState(() => {
      return {
        board: tempBoard,
      }
    })
  }

  render () {
    return (
      <Router>
        <div className = 'container'>
          <Switch>
            <Route exact path = '/'
              render = {() => {
                return (
                  <Game state={this.state}
                    handleClicks = {{
                      handleClickOnBoard: this.handleClickOnBoard,
                      handleStartClick: this.handleStartClick,
                      handleEndClick: this.handleEndClick,
                      handleGoClick: this.handleGoClick,
                    }}
                    updateLocations = {{
                      updateStartLocation: this.updateStartLocation,
                      updateEndLocation: this.updateEndLocation,
                    }}
                  />
                )
              }}
            />
          </Switch>
        </div>
      </Router>
    )
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
}

module.exports = App
