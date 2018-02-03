import React from 'react';
import PropTypes from 'prop-types';
import { autobind, } from 'core-decorators';
import NewColorsInput from '../NewColorsInput/NewColorsInput';
import SubmitColorsButton from '../SubmitColorsButton/SubmitColorsButton';

export default class SettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newColorA: '',
      newColorB: '',
      newColorC: '',
    };
    this.stateValidation = {
      newColorA: { valid: false, default: '#f00', },
      newColorB: { valid: false, default: '#00f', },
      newColorC: { valid: false, default: '#0f0', },
    };
    this.newColorNames = Object.keys(this.state);
  }
  componentWillUpdate(nextProps, nextState) {
    const { stateValidation, newColorNames, } = this;
    const isHexColor = colorKey => (
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(nextState[colorKey])
    );
    function validateInput(colorKey) {
      stateValidation[colorKey].valid = isHexColor(colorKey);
    }
    newColorNames.map(validateInput);
  }
  componentWillUnmount() {
    const { setBoardColor, } = this.props;
    const { state, stateValidation, newColorNames, } = this;
    function getColor(color) {
      if (!stateValidation[color].valid) {
        return stateValidation[color].default;
      }
      return state[color];
    }
    function updateBoardColor(color) {
      const colorLetter = color.slice(-1);
      const newColorValue = getColor(color);
      setBoardColor(`color${colorLetter}`, newColorValue);
    }
    newColorNames.map(updateBoardColor);
  }
  @autobind
  updateNewColor(e, colorLetter) {
    const colorUpdate = {};
    colorUpdate[`newColor${colorLetter}`] = e.target.value;
    this.setState(colorUpdate);
  }
  render() {
    const {
      newColorA,
      newColorB,
      newColorC,
    } = this.state;
    const { updateNewColor, } = this;
    const inputProps = {
      newColorA,
      newColorB,
      newColorC,
      updateNewColor,
    };
    return (
      <div className="settingsPanel">
        <NewColorsInput { ...inputProps } />
        <SubmitColorsButton />
      </div>
    );
  }
}

SettingsPanel.propTypes = {
  setBoardColor: PropTypes.func.isRequired,
};
