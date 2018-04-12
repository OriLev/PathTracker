import React from 'react';
import PropTypes from 'prop-types';
import InstructionsBox from '../InstructionsBox/InstructionsBox';

export default function GameInstructions({ instructionsState, }) {
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

    return instructionsList;
  }

  const currentInstructions = createInstructions(instructionsState);
  return (
    <div>
      <InstructionsBox instructions={ currentInstructions } />
    </div>
  );
}

GameInstructions.propTypes = {
  instructionsState: PropTypes.object.isRequired,
};
