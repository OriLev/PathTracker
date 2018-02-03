import React from 'react';
import PropTypes from 'prop-types';


export default function PageMain({ children, }) {
  return (
    <div className="pageMain">
      { children }
    </div>
  );
}

PageMain.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
