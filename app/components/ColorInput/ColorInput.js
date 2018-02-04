import React from 'react';
import PropTypes from 'prop-types';

export default function ColorInput({
  colorLetter,
  colorValue,
  defaultColor,
  onChange,
}) {
  const inputProps = {
    placeholder: `Default: ${defaultColor}`,
    value: colorValue,
    type: 'text',
    id: `newColor${colorLetter}`,
    onChange,
  };
  return (
    <div className="inputWrapper">
      <label htmlFor={ `newColor${colorLetter}` }>{`color ${colorLetter}: `}
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
