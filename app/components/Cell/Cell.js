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
  function getCellColor(currentCell) {
    if (currentCell.numberOfStepInPath >= 0) {
      return colorC;
    }
    if (!currentCell.isAllowedToBeSteppedOn) {
      return colorB;
    }
    return colorA;
  }

  const cellStyle = {
    backgroundColor: getCellColor(cell),
  };
  const cellProps = {
    className: 'cell',
    style: cellStyle,
    onClick: e => handleClickOnBoard(x, y, e),
  };
  const cellShellStyle = {
    height: `${cellSideLength}vh`,
    width: `${cellSideLength}vh`,
  };
  const cellShellProps = {
    className: 'cellShell',
    style: cellShellStyle,
  };

  return (
    <div { ...cellShellProps } >
      <div { ...cellProps } >
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
