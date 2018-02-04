import React from 'react';
import { Link, } from 'react-router-dom';

export default function SubmitColorsButton() {
  const linkProps = {
    className: 'btn',
    to: { pathname: '/', },
    children: 'Submit new colors',
  };
  return (
    <div className="submitButtonWrapper" >
      <Link { ...linkProps } />
    </div>
  );
}
