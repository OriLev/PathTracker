import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions({ state, }) {
  function buildInstructionArray(appState) {
    const instructionList = [];
    const {
      pathStartingPoint,
      pathEndingPoint,
      startButtonPressed,
      endButtonPressed,
    } = appState;
    const setGoBackText = buttonText => (
      `Press on the "${buttonText}" button in order to go back to toggle mode`
    );
    const setReferencePoint = buttonText => (
      `Press on a tile to set it as the "${buttonText}" of the path`
    );
    const gameInstructions = {
      toggleTile: 'Press on tiles to toggle tile availability',
      goToChooseStartMode: 'Press the "START" button to set the starting point',
      goToChooseEndMode: 'Press the "END" button to set the ending point',
      chooseReferencePoint: setReferencePoint(startButtonPressed ? 'Start' : 'End'),
      goBackToToggleTileMode: setGoBackText(startButtonPressed ? 'START' : 'END'),
      findAndDrawPath: 'Press the "GO!" button to draw path',
    };
    if (!startButtonPressed && !endButtonPressed) {
      instructionList.push(gameInstructions.toggleTile);
      if (pathStartingPoint.length === 0) {
        instructionList.push(gameInstructions.goToChooseStartMode);
      }
      if (pathEndingPoint.length === 0) {
        instructionList.push(gameInstructions.goToChooseEndMode);
      }
      if (pathStartingPoint.length !== 0 && pathEndingPoint.length !== 0) {
        instructionList.push(gameInstructions.findAndDrawPath);
      }
    }
    if (startButtonPressed || endButtonPressed) {
      instructionList.push(gameInstructions.chooseReferencePoint);
      instructionList.push(gameInstructions.goBackToToggleTileMode);
    }

    function buildInstructionElements(arr, instruction, index) {
      if (index > 0) {
        arr.push(<h6 key={ `connector${index}` }>OR</h6>);
      }
      arr.push(<h2 key={ `instruction${index}` }>{instruction}</h2>);
      return arr;
    }

    return instructionList.reduce(buildInstructionElements, []);
  }

  const currentInstructions = buildInstructionArray(state);
  return (
    <div>
      { currentInstructions }
    </div>
  );
}

Instructions.propTypes = {
  state: PropTypes.object.isRequired,
};
