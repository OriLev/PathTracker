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
  }
  componentWillUnmount() {
    const { setBoardColor, } = this.props;
    const { newColorA, newColorB, newColorC, } = this.state;
    const colors = [
      { colorLetter: 'A', currentNewColor: newColorA, },
      { colorLetter: 'B', currentNewColor: newColorB, },
      { colorLetter: 'C', currentNewColor: newColorC, },
    ];
    colors.map(color => setBoardColor(`color${color.colorLetter}`, color.currentNewColor));
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
