import React from 'react';
import PropTypes from 'prop-types';
import ColorInput from '../ColorInput/ColorInput';
// import ColorFeedback from '../ColorFeedback/ColorFeedback';

export default function NewColorsInput({
  newColors,
  updateNewColor,
  stateValidation,
  newColorNames,
}) {
  function createColors(colorName) {
    return {
      colorName,
      colorValue: newColors[colorName],
      defaultColor: stateValidation[colorName].defaultColor,
      isValid: stateValidation[colorName].isValid,
    };
  }
  const colors = newColorNames.map(createColors);
  // function getFeedbackText(isValid, defaultColor) {
  //   if (isValid) {
  //     return 'The input color is valid: ';
  //   }
  //   return `The input color is invalid. Default color (${defaultColor}) will be used: `;
  // }
  // function getFeedbackStyle(isValid) {
  //   if (isValid) {
  //     return {
  //       color: '#0f0',
  //     };
  //   }
  //   return {
  //     color: '#f00',
  //   };
  // }
  function createNewColorInputContainer(color) {
    const {
      colorName,
      colorValue,
      defaultColor,
      isValid,
    } = color;
    const colorLetter = colorName.slice(-1);
    const colorInputProps = {
      colorLetter,
      colorValue,
      defaultColor,
      isValid,
      onChange(e) {
        return updateNewColor(e, colorLetter);
      },
    };
    // const feedbackText = getFeedbackText(isValid, defaultColor);
    // const feedbackStyle = getFeedbackStyle(isValid);
    // const colorToBeUsed = (isValid) ? colorValue : defaultColor;
    // const colorFeedbackProps = {
    //   feedbackText,
    //   feedbackStyle,
    //   colorToBeUsed,
    // };<ColorFeedback { ...colorFeedbackProps } />
    return (
      <div className="inputContainer" key={ colorLetter } >
        <ColorInput { ...colorInputProps } />
      </div>
    );
  }
  return (
    <div className="colorInputsWrapper" >
      { colors.map(createNewColorInputContainer) }
    </div>
  );
}

NewColorsInput.propTypes = {
  newColors: PropTypes.object.isRequired,
  updateNewColor: PropTypes.func.isRequired,
  stateValidation: PropTypes.object.isRequired,
  newColorNames: PropTypes.array.isRequired,
};
