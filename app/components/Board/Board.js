import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row/Row';

export default function Board(props) {
  console.log('props Board: ');
  console.log(props);
  const board = props.state.board;
  return (
    <div className="board">
      {board.map((row, indexY) => (
        <Row
          key={ `row${indexY}` }
          indexY={ indexY }
          row={ row }
          props={ props }
        />
        ))}
    </div>
  );
}
