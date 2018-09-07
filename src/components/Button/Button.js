import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  const {
    children,
    onClick,
    disabled,
  } = props;

  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      { children }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  disabled: null,
};

export default Button;
