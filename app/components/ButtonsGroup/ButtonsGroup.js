import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonsGroup({ buttons, }) {
  const style = {
    height: `${100 / buttons.length}%`,
  };
  function createButton(buttonObject, index) {
    const {
      text,
      classes,
      disabled,
      onClick,
    } = buttonObject;
    const buttonProps = {
      type: 'button',
      key: `button${index}`,
      className: classes,
      style,
      onClick,
      disabled,
      children: text,
    };
    return <button { ...buttonProps } />;
  }
  return (
    <div className="buttonGroup">
      { buttons.map(createButton) }
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
