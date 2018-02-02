import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader/PageHeader';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { Link, } from 'react-router-dom';

export default function SettingsScreen({ setBoardColor, }) {
  const headerProps = { instructions: [ 'Please enter the colors of your choice in hex format' ], };
  const linkProps = {
    // href: '/settings',
    className: 'settingsLink',
    to: { pathname: '/', },
    children: 'back to game',
  };
  return (
    <div className="settingsContainer">
      <PageHeader { ...headerProps } />
      <Link { ...linkProps } />
      <SettingsPanel />
    </div>
  );
}

SettingsScreen.propTypes = {
  setBoardColor: PropTypes.func.isRequired,
};
