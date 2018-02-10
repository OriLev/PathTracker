import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader/PageHeader';
import PageMain from '../PageMain/PageMain';

export default function SettingsScreen({ setBoardColor, }) {
  const headerProps = { instructions: [ 'Enter the colors of your choice in hex format' ], };
  const mainProps = {
    setBoardColor,
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
