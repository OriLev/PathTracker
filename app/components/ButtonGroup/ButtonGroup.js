import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonGroup({ buttons, }) {
  const style = {
    height: `${100 / buttons.length}%`,
  };

  return (
    <div className="buttonGroup">
      {
        buttons.map((button, index) => {
          const {
            text,
            classes,
            disabled,
            onClick,
          } = button;
          const buttonProps = {
            type: 'button',
            key: `button${index}`,
            className: classes,
            style,
            onClick,
            disabled,
          };
          return (
            <button { ...buttonProps }>
              {text}
            </button>
          );
        })
      }
    </div>
  );
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
};
