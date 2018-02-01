import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';

export default function Row({
  rowState: {
    colorA,
    colorB,
    colorC,
    rowHeight,
    row,
    pathStartingPoint,
    pathEndingPoint,
  },
  indexY,
  handleClickOnBoard,
}) {
  return (
    <div className="row">
      {row.map((cell, indexX) => {
        const cellState = {
          colorA,
          colorB,
          colorC,
          cellSideLength: rowHeight,
          cell,
          pathStartingPoint,
          pathEndingPoint,
        };
        // console.log(cell);
        const cellProps = {
          key: `cell${indexY}${indexX}`,
          cellCoordinates: {
            x: indexX,
            y: indexY,
          },
          cellState,
          handleClickOnBoard,
        };
        return (
          <Cell { ...cellProps } />
        );
      })}
    </div>
  );
}

Row.propTypes = {
  rowState: PropTypes.object.isRequired,
  indexY: PropTypes.number.isRequired,
  handleClickOnBoard: PropTypes.func.isRequired,
};
