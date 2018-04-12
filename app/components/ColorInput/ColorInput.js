import React from 'react';
import PropTypes from 'prop-types';

export default function ColorInput({
  colorLetter,
  colorValue,
  defaultColor,
  onChange,
}) {
  const inputProps = {
    value: colorValue,
    type: 'color',
    onChange,
  };
  return (
    <div className="inputWrapper">
      <label>{`color ${colorLetter}:`}
        <input { ...inputProps } />
      </label>
    </div>
  );
}

ColorInput.propTypes = {
  colorLetter: PropTypes.string.isRequired,
  colorValue: PropTypes.string.isRequired,
  defaultColor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
