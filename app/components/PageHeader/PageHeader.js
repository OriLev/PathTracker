import React from 'react';
import PropTypes from 'prop-types';
import InstructionsBox from '../InstructionsBox/InstructionsBox';

export default function PageHeader({ instructions, }) {
  const instructionsProps = { instructions, };
  return (
    <div className="pageHeader">
      <div className="instructionsWrapper">
        <InstructionsBox { ...instructionsProps } />
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  instructions: PropTypes.array.isRequired,
};
