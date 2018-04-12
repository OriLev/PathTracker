import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader/PageHeader';
import PageMain from '../PageMain/PageMain';

export default function SettingsScreen({
  colorA,
  colorB,
  colorC,
  setBoardColor,
}) {
  const headerProps = { instructions: [ 'Press on the color squares to choose new colors' ], };
  const mainProps = {
    colorA,
    colorB,
    colorC,
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
  colorA: PropTypes.string.isRequired,
  colorB: PropTypes.string.isRequired,
  colorC: PropTypes.string.isRequired,
  setBoardColor: PropTypes.func.isRequired,
};
