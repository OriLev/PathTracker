import React from 'react';
import PropTypes from 'prop-types';
import AppButton from '../AppButton/AppButton';

export default function ButtonsGroup({ buttons, }) {
  const style = {
    height: `${100 / buttons.length}%`,
  };
  return (
    <div className="buttonGroup">
      { buttons.map((button, index) => {
        const buttonProps = {
          style,
          button,
          index,
        };
        return <AppButton { ...buttonProps } />;
      })}
    </div>
  );
}

ButtonsGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })).isRequired,
};
