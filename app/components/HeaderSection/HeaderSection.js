import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderSection({ children, }) {
  return (
    <div className="pageHeader">
      { children }
    </div>
  );
}

HeaderSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
