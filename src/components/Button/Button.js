import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  const {
    children,
    onClick,
    disabled,
    id,
  } = props;

  return (
    <button
      className="Button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      { children }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.string,
  id: PropTypes.number,
};

Button.defaultProps = {
  onClick: null,
  disabled: null,
  id: null,
};

export default Button;
