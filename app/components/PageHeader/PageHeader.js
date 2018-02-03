import React from 'react';
import PropTypes from 'prop-types';

export default function PageHeader({ children, }) {
  return (
    <div className="pageHeader">
      { children }
    </div>
  );
}

PageHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
