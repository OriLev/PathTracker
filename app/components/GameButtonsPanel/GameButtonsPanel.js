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
  const isStartOrEndButtonDisabled = (location) => {
    if (location.length > 0) {
      return true;
    }
    return false;
  };
  const isGoButtonDisabled = (locationOfStart, locationOfEnd) => (
    !isStartOrEndButtonDisabled(locationOfStart) || !isStartOrEndButtonDisabled(locationOfEnd)
  );
  const buttons = [
    {
      text: 'START',
      classes: `btn${startButtonPressed ? ' pressed' : ''}`,
      disabled: isStartOrEndButtonDisabled(pathStartingPoint),
      onClick: toggleStartButtonPressed,
    },
    {
      text: 'END',
      classes: `btn${endButtonPressed ? ' pressed' : ''}`,
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
      <ButtonGroup
        buttons={ buttons }
      />
    </div>
  );
}

GameButtonsPanel.propTypes = {
  state: PropTypes.object.isRequired,
  toggleStartButtonPressed: PropTypes.func.isRequired,
  toggleEndButtonPressed: PropTypes.func.isRequired,
  findAndDrawPath: PropTypes.func.isRequired,
};
