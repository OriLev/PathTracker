import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonGroup(props) {
  const { buttons, } = props;
  const buttonHeight = {
    style: {
      height: `${100 / props.buttons.length}%`,
    },
  };

  return (
    <div className="btnGrp">
      {
        buttons.map((button, index) => {
          const {
 text, classes, disabled, onClick,
} = button;
          return (
            <button
              type="button"
              disabled={ disabled }
              key={ `button${index}` }
              className={ classes }
              style={ buttonHeight.style }
              onClick={ onClick }
            >
              {text}
            </button>
          );
        })
      }
    </div>
  );
}
