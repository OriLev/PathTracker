import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';

export default function Row({ state, indexY, handleClickOnBoard, }) {
  const {
    colorA,
    colorB,
    colorC,
    rowHeight,
    row,
    pathStartingPoint,
    pathEndingPoint,
  } = state;
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
          cellIndex: {
            x: indexX,
            y: indexY,
          },
          state: cellState,
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
  state: PropTypes.object.isRequired,
  indexY: PropTypes.number.isRequired,
  handleClickOnBoard: PropTypes.func.isRequired,
};
