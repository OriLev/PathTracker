const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

function Cell(props) {
	// console.log('props Cell:')
	// console.log(props)
	
	const {x, y} = props.cellData;
	props = props.props;
	const {board, colorA, colorB, start, end} = props.state;
	const lengthY = board.length;
	// const styles = {
	// 	cell: {	
	// 		backgroundColor: 
	// 	}
	// }

	return (
		<div className = 'cellShell'
			style = {{'height': (40/lengthY) + 'vh', 'width': (40/lengthY) + 'vh'}}>
			<div className = 'cell'
				style = {{'backgroundColor': (board[y][x].allowed ? colorA : colorB)}}
				onClick = {props.handleClickOnBoard.bind(null, x, y)}
			>
				{(start[0] === x) && (start[1] === y) && <div>start</div>}
				{(end[0] === x) && (end[1] === y) && <div>end</div>}
			</div>	
		</div>
	)
}

function Row(props) {
	// console.log('props Row: ')
	// console.log(props)
	const {row, indexY} = props;
	props = props.props;
	return (
		<div className = 'row'> 
			{row.map((cell, indexX) => {
				return (
					<Cell key = {'cell' + indexY + indexX} 
						cellData = {{
							x: indexX,
							y: indexY
						}}
						props = {props}
					/>	
				)
			})}
		</div>
	)
}
function Board(props) {
	console.log('props Board: ')
	console.log(props)
	const board = props.state.board;
	const {handleClickOnBoard} = props;
	return (
		<div className = 'board'>
			{board.map((row, indexY) => {
				return (
					<Row key = {'row' + indexY} 
						indexY = {indexY}
						row = {row}
						props = {props} 
					/> 
				)
			})}
		</div>
	);	
}

function GameHeader(props) {
	const settingsText = '<-- Settings';
	return (
		<div className = 'instructionsContainer'>
			<Link
				className = 'settingsLink'
				to = {{
					pathname: '/'
				}}
			>
				{settingsText}
			</Link>
			<h1 className = 'instructions'> instructions to be here </h1>
		</div>
	)
}

function ButtonGroup(props) {
	const {buttons} = props;
	const buttonHeight = {
		style: {
			height: (100/props.buttons.length) + '%'
		}
	}

	
	return (
		<div  className = 'btnGrp'>
				{
					buttons.map((button, index) => {
						const {text, classes, disabled, activated, onClick} = button;
						return (
							<button
								type = "button" 
								aria-pressed = {activated()}
								disabled = {disabled()}
								key = {'button' + index} 
								className = {classes}
								style = {buttonHeight.style}
								onClick = {onClick}
							> 
								{text} 
							</button>
						)
					})	
				}
		</div>
	)
}

function GameButtonsPanel(props) {
	const {start, end, startFlag, endFlag} = props.state;
	const disabledCheck = (location) => {
				if (location.length > 0) {
					return true
				} else {
					return false
				}
	}
	console.log('button panel:')
	console.log(props)
	console.log('endFlag = ' + props.state.endFlag);
	const buttons = [
		{
			text: 'Start',
			classes: 'btn' + (startFlag ? ' pressed':''),
			disabled: () => {return disabledCheck(start)},
			activated: () => {
				console.log(startFlag)
				return startFlag},
			onClick: props.handleClickOnButtons.handleStartClick,
		},
		{
			text: 'End',
			classes: 'btn' + (endFlag ? ' pressed':''),
			disabled: () => {return disabledCheck(end)},
			activated: () => {return endFlag},
			onClick: props.handleClickOnButtons.handleEndClick,
		},
		{
			text: 'Go!',
			classes: 'btn success',
			activated: () => {return false},
			disabled: () => {return (!disabledCheck(start) || !disabledCheck(end))},
			onClick: () => {},
		}
	];
	console.log('buttons ok') 
	
	return (
		<div className = 'buttonsPanel'> 
			<ButtonGroup 
				buttons = {buttons}
			/>
		</div>
	)
}

function GameScreen(props) {
	props = props.props;
	console.log('in gameScreen')
	console.log(props)
	const board = props.state.board;
	return (
		<div className = 'gameScreen'>
			<div className = 'boardContainer'> 
				<Board state = {props.state} 
					handleClickOnBoard = {props.handleClicks.handleClickOnBoard}
				/>
			</div>
			<GameButtonsPanel state = {props.state} 
					handleClickOnButtons = {{
						handleStartClick: props.handleClicks.handleStartClick,
						handleEndClick: props.handleClicks.handleEndClick
					}}
			/>
		</div>
	)
}

function Game(props) {
	return (
		<div className = 'gameContainer'>
			<GameHeader />
			<GameScreen props = {props} />
		</div>
	)
}

module.exports = Game;