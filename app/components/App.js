const React = require('react');
const PropTypes = require('prop-types');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Game = require('./Game');
// const Settings = require('./Settings');
// const Results = require('./Results');

function boardReset(lengthX, lengthY) {
	console.log('creating board')
	const board = [];
	for (let i=0; i<lengthY; i++) {
		board[i] = [];
		for (let j=0; j<lengthX; j++) {
			board[i][j] = {
				allowed: true,
				stepVisited: -1
			}
		}
	}	

	return board;
}

class App extends React.Component {
	constructor(props) {
		super(props);

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
			time:'',
		}

		this.handleClickOnBoard = this.handleClickOnBoard.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleEndClick = this.handleEndClick.bind(this);
		this.updateStartLocation = this.updateStartLocation.bind(this);
		this.updateEndLocation = this.updateEndLocation.bind(this);
	}

	handleClickOnBoard(x, y) {
		console.log('trying to update state');
		if (this.state.startFlag) {
			this.updateStartLocation(x, y);
		} else if (this.state.endFlag) {
			this.updateEndLocation(x, y);
		} else {
			const tempBoard = this.state.board;
			tempBoard[y][x].allowed = this.state.board[y][x].allowed ? false : true;
			console.log(tempBoard)
			this.setState(() => {
				return {
					board: tempBoard 
				}
			})	
		}
	}

	handleStartClick() {
		this.setState(() => {
			return {
				startFlag: !this.state.startFlag
			}
		})
	}

	handleEndClick() {
		this.setState(() => {
			return {
				endFlag: !this.state.endFlag
			}
		})
	}

	updateStartLocation(x, y) {
		this.setState(() => {
			return {
				start: [x, y],
				startFlag: false
			}
		})
	}

	updateEndLocation(x, y) {
		this.setState(() => {
			return {
				end: [x, y],
				endFlag: false
			}
		})
	}

  render() {
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
		    						handleEndClick: this.handleEndClick
		    					}}
		    					updateLocations = {{
		    						updateStartLocation: this.updateStartLocation,
		    						updateEndLocation: this.updateEndLocation
		    					}}/>
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
		y: 12
	},
	colors: {
		A: 'red',
		B: 'blue',
		C: 'green'
	}
}

module.exports = App;