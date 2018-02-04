import React from 'react';
import PropTypes from 'prop-types';

export default function ColorInput({
  colorLetter,
  currentNewColor,
  defaultText,
  onChange,
}) {
  const inputProps = {
    placeholder: `Default: ${defaultText}`,
    value: currentNewColor,
    type: 'text',
    id: `newColor${colorLetter}`,
    onChange,
  };
  return (
    <div className="inputWrapper">
      <label htmlFor={ `newColor${colorLetter}` }>{`color ${colorLetter}:`}
        <input { ...inputProps } />
      </label>
    </div>
  );
}

ColorInput.propTypes = {
  colorLetter: PropTypes.string.isRequired,
  currentNewColor: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
