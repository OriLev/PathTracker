import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row/Row';

export default function Board({
  boardState: {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
  },
  handleClickOnBoard,
}) {
  return (
    <div className="board">
      {board.map((row, indexY) => {
        const rowState = {
          colorA,
          colorB,
          colorC,
          rowHeight: 40 / board.length,
          row,
          pathStartingPoint,
          pathEndingPoint,
        };
        // console.log(row);
        const rowProps = {
          key: `row${indexY}`,
          indexY,
          rowState,
          handleClickOnBoard,
        };
        return (
          <Row { ...rowProps } />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  boardState: PropTypes.object.isRequired,
  handleClickOnBoard: PropTypes.func.isRequired,
};
