import React from 'react';
import PropTypes from 'prop-types';


export default function MainSection({ children, }) {
  return (
    <div className="pageMain">
      { children }
    </div>
  );
}

MainSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
