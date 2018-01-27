import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonGroup({ buttons, }) {
  const style = {
    height: `${100 / buttons.length}%`,
  };

  return (
    <div className="buttonGroup">
      {
        buttons.map((
          {
            text,
            classes,
            disabled,
            onClick,
          },
          index,
        ) => {
          const buttonProps = {
            type: 'button',
            key: `button${index}`,
            className: classes,
            style,
            onClick,
            disabled,
            children: text,
          };
          return (
            <button { ...buttonProps } />
          );
        })
      }
    </div>
  );
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
};
