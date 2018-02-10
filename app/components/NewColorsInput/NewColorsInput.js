import React from 'react';
import PropTypes from 'prop-types';
import ColorInput from '../ColorInput/ColorInput';

export default function NewColorsInput({
  newColorA: A,
  newColorB: B,
  newColorC: C,
  updateNewColor,
}) {
  const colors = [
    { colorLetter: 'A', currentNewColor: A, defaultText: 'red (#f00)', },
    { colorLetter: 'B', currentNewColor: B, defaultText: 'blue (#00f)', },
    { colorLetter: 'C', currentNewColor: C, defaultText: 'green (#0f0)', },
  ];
  function createNewColorInput(color) {
    const { colorLetter, currentNewColor, defaultText, } = color;
    const colorInputProps = {
      colorLetter,
      currentNewColor,
      defaultText,
      key: colorLetter,
      onChange(e) {
        return updateNewColor(e, colorLetter);
      },
    };
    return <ColorInput { ...colorInputProps } />;
  }
  return (
    <div className="colorInputsWrapper" >
      { colors.map(createNewColorInput) }
    </div>
  );
}

NewColorsInput.propTypes = {
  newColorA: PropTypes.string.isRequired,
  newColorB: PropTypes.string.isRequired,
  newColorC: PropTypes.string.isRequired,
  updateNewColor: PropTypes.func.isRequired,
};
