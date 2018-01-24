import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

export default function GameButtonsPanel(props) {
  const {
    pathStartingPoint, pathEndingPoint, startButtonPressed, endButtonPressed,
  } = props.state;
  const checkIfDisabled = (location) => {
    if (location.length > 0) {
      return true;
    }
    return false;
  };
  const buttons = [
    {
      text: 'START',
      classes: `btn${startButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(pathStartingPoint),
      onClick: props.toggleStartSettingFlag,
    },
    {
      text: 'END',
      classes: `btn${endButtonPressed ? ' pressed' : ''}`,
      disabled: checkIfDisabled(pathEndingPoint),
      onClick: props.toggleEndSettingFlag,
    },
    {
      text: 'GO!',
      classes: 'btn success',
      disabled: (!checkIfDisabled(pathStartingPoint) || !checkIfDisabled(pathEndingPoint)),
      onClick: props.findAndDrawPath,
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
