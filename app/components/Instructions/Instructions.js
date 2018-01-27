import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions({ state, }) {
  function createInstructionArray(appState) {
    const instructionList = [];
    const {
      pathStartingPoint,
      pathEndingPoint,
      startButtonPressed,
      endButtonPressed,
    } = appState;
    const getGoBackText = buttonText => (
      `Press on the "${buttonText}" button in order to go back to toggle mode`
    );
    const getReferencePoint = buttonText => (
      `Press on a tile to set it as the "${buttonText}" of the path`
    );
    const toggleTile = 'Press on tiles to toggle tile availability';
    const goToChooseStartMode = 'Press the "START" button to set the starting point';
    const goToChooseEndMode = 'Press the "END" button to set the ending point';
    const chooseReferencePoint = getReferencePoint(startButtonPressed ? 'Start' : 'End');
    const goBackToToggleTileMode = getGoBackText(startButtonPressed ? 'START' : 'END');
    const findAndDrawPath = 'Press the "GO!" button to draw path';
    if (!startButtonPressed && !endButtonPressed) {
      instructionList.push(toggleTile);
      if (pathStartingPoint.length === 0) {
        instructionList.push(goToChooseStartMode);
      }
      if (pathEndingPoint.length === 0) {
        instructionList.push(goToChooseEndMode);
      }
      if (pathStartingPoint.length !== 0 && pathEndingPoint.length !== 0) {
        instructionList.push(findAndDrawPath);
      }
    }
    if (startButtonPressed || endButtonPressed) {
      instructionList.push(chooseReferencePoint);
      instructionList.push(goBackToToggleTileMode);
    }

    function createInstructionElements(arrayOfInstructionElements, instruction, index) {
      if (index > 0) {
        arrayOfInstructionElements.push(<h6 key={ `connector${index}` }>OR</h6>);
      }
      arrayOfInstructionElements.push(<h2 key={ `instruction${index}` }>{instruction}</h2>);
      return arrayOfInstructionElements;
    }

    return instructionList.reduce(createInstructionElements, []);
  }

  const currentInstructions = createInstructionArray(state);
  return (
    <div>
      { currentInstructions }
    </div>
  );
}

Instructions.propTypes = {
  state: PropTypes.object.isRequired,
};
