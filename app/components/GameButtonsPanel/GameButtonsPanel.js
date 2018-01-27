import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

export default function GameButtonsPanel(props) {
  const {
    state,
    toggleStartButtonPressed,
    toggleEndButtonPressed,
    findAndDrawPath,
  } = props;
  const {
    pathStartingPoint,
    pathEndingPoint,
    startButtonPressed,
    endButtonPressed,
  } = state;
  const isStartOrEndButtonDisabled = location => location.length > 0;
  const isGoButtonDisabled = (locationOfStart, locationOfEnd) => (
    !isStartOrEndButtonDisabled(locationOfStart) || !isStartOrEndButtonDisabled(locationOfEnd)
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
      <ButtonGroup { ...{ buttons, } } />
    </div>
  );
}

GameButtonsPanel.propTypes = {
  state: PropTypes.object.isRequired,
  toggleStartButtonPressed: PropTypes.func.isRequired,
  toggleEndButtonPressed: PropTypes.func.isRequired,
  findAndDrawPath: PropTypes.func.isRequired,
};
