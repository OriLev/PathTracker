import React from 'react';
import PropTypes from 'prop-types';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

export default function PageMain({ setBoardColor, }) {
  const panelProps = { setBoardColor, };
  return (
    <div className="pageMain">
      <SettingsPanel { ...panelProps } />
    </div>
  );
}

PageMain.propTypes = {
  setBoardColor: PropTypes.func.isRequired,
};
