import React from 'react';
import PropTypes from 'prop-types';


export default function MainSection({ children, }) {
  return (
    <div className="pageMain">
      { children }
    </div>
  );
}

PageMain.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
