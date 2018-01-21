import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';

export default function Row(props) {
  // console.log('props Row: ')
  // console.log(props)
  const { row, indexY, } = props;
  props = props.props;
  return (
    <div className="row">
      {row.map((cell, indexX) => (
        <Cell
          key={ `cell${indexY}${indexX}` }
          cellData={ {
              x: indexX,
              y: indexY,
            } }
          props={ props }
        />
        ))}
    </div>
  );
}
