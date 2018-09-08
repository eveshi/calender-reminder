import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = (props) => {
  const {
    maxLength,
    placeholder,
    value,
    onKeyPress,
    onChange,
    type,
  } = props;

  return (
    <input
      className="input"
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  onKeyPress: null,
  placeholder: '',
  maxLength: null,
};

export default Input;
