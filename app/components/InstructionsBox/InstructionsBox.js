import React from 'react';
import PropTypes from 'prop-types';

export default function InstructionsBox({ instructions, }) {
  function createInstructionElements(arrayOfInstructionElements, instruction, index) {
    if (index > 0) {
      arrayOfInstructionElements.push(<h6 key={ `connector${index}` }>OR</h6>);
    }
    arrayOfInstructionElements.push(<h2 key={ `instruction${index}` }>{instruction}</h2>);
    return arrayOfInstructionElements;
  }
  return instructions.reduce(createInstructionElements, []);
}

InstructionsBox.propTypes = {
  instructions: PropTypes.array.isRequired,
};
