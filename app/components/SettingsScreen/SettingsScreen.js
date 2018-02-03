import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader/PageHeader';
import PageMain from '../PageMain/PageMain';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import InstructionsBox from '../InstructionsBox/InstructionsBox';

export default function SettingsScreen({ setBoardColor, }) {
  const instructionsProps = { instructions: [ 'Please enter the colors of your choice in hex format' ], };
  const instructions = (
    <div className="instructionsWrapper" key="1">
      <InstructionsBox { ...instructionsProps } />
    </div>
  );
  const headerProps = { children: [ instructions ], };

  const settingsPanelProps = { setBoardColor, key: 1, };
  const mainProps = {
    children: [ <SettingsPanel { ...settingsPanelProps } /> ],
  };
  return (
    <div className="settingsContainer">
      <PageHeader { ...headerProps } />
      <PageMain { ...mainProps } />
    </div>
  );
}

SettingsScreen.propTypes = {
  setBoardColor: PropTypes.func.isRequired,
};
