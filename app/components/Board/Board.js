import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row/Row';

export default function Board(props) {
  const { state, handleClickOnBoard, } = props;
  const {
    colorA,
    colorB,
    colorC,
    board,
    pathStartingPoint,
    pathEndingPoint,
  } = state;
  console.log('props Board: ');
  console.log(props);
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
          state: rowState,
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
  state: PropTypes.object.isRequired,
  handleClickOnBoard: PropTypes.func.isRequired,
};
