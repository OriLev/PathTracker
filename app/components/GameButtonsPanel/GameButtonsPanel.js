import React from 'react';
import PropTypes from 'prop-types';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';

export default function GameButtonsPanel({
  buttonsState: {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
    goButtonPressed,
  },
  toggleStartButtonPressed,
  toggleEndButtonPressed,
  findAndDrawPath,
}) {
  const isStartOrEndButtonDisabled = location => location.length > 0;
  const isGoButtonDisabled = (locationOfStart, locationOfEnd) => (
    !isStartOrEndButtonDisabled(locationOfStart) ||
    !isStartOrEndButtonDisabled(locationOfEnd) ||
    goButtonPressed
  );
  const getButtonClasses = isButtonPressed => `btn${isButtonPressed ? ' pressed' : ''}`;
  const buttons = [
    {
      text: 'START',
      classes: getButtonClasses(startButtonPressed),
      disabled: isStartOrEndButtonDisabled(pathStartingPoint),
      onClick: toggleStartButtonPressed,
    },
    {
      text: 'END',
      classes: getButtonClasses(endButtonPressed),
      disabled: isStartOrEndButtonDisabled(pathEndingPoint),
      onClick: toggleEndButtonPressed,
    },
    {
      text: 'GO!',
      classes: 'btn success',
      disabled: isGoButtonDisabled(pathStartingPoint, pathEndingPoint),
      onClick: findAndDrawPath,
    },
  ];
  console.log('buttons ok');

  return (
    <div className="buttonsPanel">
      <ButtonsGroup { ...{ buttons, } } />
    </div>
  );
}

GameButtonsPanel.propTypes = {
  buttonsState: PropTypes.object.isRequired,
  toggleStartButtonPressed: PropTypes.func.isRequired,
  toggleEndButtonPressed: PropTypes.func.isRequired,
  findAndDrawPath: PropTypes.func.isRequired,
};
