import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions({ instructionsState, }) {
  function createInstructions(appState) {
    const instructionsList = [];
    const {
      pathStartingPoint,
      pathEndingPoint,
      startButtonPressed,
      endButtonPressed,
    } = appState;
    const getGoBackText = buttonText => (
      `Press on the "${buttonText}" button in order to go back to toggle mode`
    );
    const getSetReferencePointText = buttonText => (
      `Press on a tile to set it as the "${buttonText}" of the path`
    );
    const addInstruction = instructionsList.push.bind(instructionsList);
    const toggleTile = 'Press on tiles to toggle tile availability';
    const goToChooseStartMode = 'Press the "START" button to set the starting point';
    const goToChooseEndMode = 'Press the "END" button to set the ending point';
    const setReferencePoint = getSetReferencePointText(startButtonPressed ? 'Start' : 'End');
    const goBackToToggleTileMode = getGoBackText(startButtonPressed ? 'START' : 'END');
    const findAndDrawPath = 'Press the "GO!" button to draw path';
    const pathStartingPointSet = !(pathStartingPoint.length === 0);
    const pathEndingPointSet = !(pathEndingPoint.length === 0);
    if (!startButtonPressed && !endButtonPressed) {
      addInstruction(toggleTile);
      if (!pathStartingPointSet) {
        addInstruction(goToChooseStartMode);
      }
      if (!pathEndingPointSet) {
        addInstruction(goToChooseEndMode);
      }
      if (pathStartingPointSet && pathEndingPointSet) {
        addInstruction(findAndDrawPath);
      }
    }
    if (startButtonPressed || endButtonPressed) {
      addInstruction(setReferencePoint);
      addInstruction(goBackToToggleTileMode);
    }

    function createInstructionElements(arrayOfInstructionElements, instruction, index) {
      if (index > 0) {
        arrayOfInstructionElements.push(<h6 key={ `connector${index}` }>OR</h6>);
      }
      arrayOfInstructionElements.push(<h2 key={ `instruction${index}` }>{instruction}</h2>);
      return arrayOfInstructionElements;
    }

    return instructionsList.reduce(createInstructionElements, []);
  }

  const currentInstructions = createInstructions(instructionsState);
  return (
    <div>
      { currentInstructions }
    </div>
  );
}

Instructions.propTypes = {
  instructionsState: PropTypes.object.isRequired,
};
