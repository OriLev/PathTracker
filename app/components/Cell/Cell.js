import React from 'react';
import PropTypes from 'prop-types';

export default function Cell(props) {
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
