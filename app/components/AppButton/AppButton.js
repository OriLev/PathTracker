import React from 'react';
import PropTypes from 'prop-types';

export default function AppButton({ button, style, index, }) {
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
    children: text,
  };
  return <button { ...buttonProps } />;
}

AppButton.propTypes = {
  button: PropTypes.shape({
    text: PropTypes.string,
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }).isRequired,
  style: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
