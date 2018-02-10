import React from 'react';
import PropTypes from 'prop-types';
import HeaderSection from '../HeaderSection/HeaderSection';
import MainSection from '../MainSection/MainSection';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import InstructionsBox from '../InstructionsBox/InstructionsBox';

export default function SettingsScreen({ setBoardColor, }) {
  return (
    <div className="settingsContainer">
      <HeaderSection>
        <div className="instructionsWrapper" >
          <InstructionsBox instructions={ [ 'Enter the colors of your choice in hex format' ] } />
        </div>
      </HeaderSection>
      <MainSection>
        <SettingsPanel setBoardColor={ setBoardColor } />
      </MainSection>
    </div>
  );
}

SettingsScreen.propTypes = {
  setBoardColor: PropTypes.func.isRequired,
};
