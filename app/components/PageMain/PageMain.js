import React from 'react';
import PropTypes from 'prop-types';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

export default function PageMain({
  colorA,
  colorB,
  colorC,
  setBoardColor,
}) {
  const panelProps = {
    colorA,
    colorB,
    colorC,
    setBoardColor,
  };
  return (
    <div className="pageMain">
      <SettingsPanel { ...panelProps } />
    </div>
  );
}

PageMain.propTypes = {
  colorA: PropTypes.string.isRequired,
  colorB: PropTypes.string.isRequired,
  colorC: PropTypes.string.isRequired,
  setBoardColor: PropTypes.func.isRequired,
};
