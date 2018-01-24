import React from 'react';
import PropTypes from 'prop-types';

export default function Cell({ state, cellIndex, handleClickOnBoard, }) {
  const { x, y, } = cellIndex;
  const {
    colorA,
    colorB,
    colorC,
    cellSideLength,
    cell,
    pathStartingPoint,
    pathEndingPoint,
  } = state;
  // const styles = {
  // 	cell: {
  // 		backgroundColor:
  // 	}
  // }

  const getCellColor = (currentCell) => {
    // console.log('getCellColor');
    // console.log(currentCell);
    if (currentCell.stepVisited >= 0) {
      return colorC;
    }
    if (!currentCell.isAllowedToBeSteppedOn) {
      console.log('not allowed!');
      return colorB;
    }
    return colorA;
  };

  const cellStyle = {
    backgroundColor: getCellColor(cell),
  };
  const cellShellStyle = {
    height: `${cellSideLength}vh`,
    width: `${cellSideLength}vh`,
  };

  return (
    <div
      className="cellShell"
      style={ cellShellStyle }
    >
      <div
        className="cell"
        style={ cellStyle }
        onClick={ e => handleClickOnBoard(x, y, e) }
      >
        {(pathStartingPoint[0] === x) && (pathStartingPoint[1] === y) && <div>start</div>}
        {(pathEndingPoint[0] === x) && (pathEndingPoint[1] === y) && <div>end</div>}
      </div>
    </div>
  );
}

Cell.propTypes = {
  state: PropTypes.object.isRequired,
  cellIndex: PropTypes.object.isRequired,
  handleClickOnBoard: PropTypes.func.isRequired,
};
