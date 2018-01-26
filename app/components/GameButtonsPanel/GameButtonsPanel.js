import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

export default function GameButtonsPanel(props) {
  const {
    startingPoint, endingPoint, startButtonPressed, endButtonPressed,
  } = props.state;
  const checkIfDisabled = (location) => {
    if (location.length > 0) {
      return true;
    }
    return false;
  };
  const buttons = [
    {
      text: 'Start',
      classes: `btn${startButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(startingPoint),
      onClick: props.handleClickOnButtons.toggleStartSettingFlag,
    },
    {
      text: 'End',
      classes: `btn${endButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(endingPoint),
      onClick: props.handleClickOnButtons.toggleEndSettingFlag,
    },
    {
      text: 'Go!',
      classes: 'btn success',
      disabled: (!checkIfDisabled(startingPoint) || !checkIfDisabled(endingPoint)),
      onClick: props.handleClickOnButtons.findAndDrawPath,
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
