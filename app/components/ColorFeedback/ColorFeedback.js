import React from 'react';
import PropTypes from 'prop-types';

export default function ColorFeedback({
  feedbackText,
  feedbackStyle,
  colorToBeUsed,
}) {
  const feedbackProps = {
    style: feedbackStyle,
    children: feedbackText,
  };
  const exampleProps = {
    style: {
      display: 'inline-block',
      backgroundColor: colorToBeUsed,
      width: '0.8em',
      height: '0.8em',
      borderRadius: '50%',
      border: 'solid 1px',
    },
  };
  return (
    <div className="feedbackWrapper">
      <span { ...feedbackProps } />
      <div { ...exampleProps } />
    </div>
  );
}

ColorFeedback.propTypes = {
  feedbackText: PropTypes.string.isRequired,
  feedbackStyle: PropTypes.object.isRequired,
  colorToBeUsed: PropTypes.string.isRequired,
};
