import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const TextField = ({
  name,
  value,
  title,
  disabled,
  className,
  textAlign,
  onChangeCallback,
  onBlurCallback,
  required,
  apiError,
  isUpperCase
}) => {
  const getClassName = () => {
    return 'w-full text-' +
      textAlign + ' ' +
      theme.textBox[(disabled ? "disabled" : "enabled")] +
      ((apiError !== "" && apiError[name]) ? " bg-red-50" : "") +
      (isUpperCase ? " uppercase " : "")
  }

  return (
    <div className={className}>
      <input
        required={required}
        name={name}
        value={value}
        type="text"
        title={title}
        disabled={disabled}
        className={getClassName()}
        onChange={e => onChangeCallback(e)}
        onBlur={e => onBlurCallback(e)}
      />
      <div className={(apiError !== "" && apiError[name]) ? "text-xs text-red-400 font-publicSans pt-1" : "hidden"}>{apiError[name]}</div>
    </div>
  )
}

TextField.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isUpperCase: PropTypes.bool
};

TextField.defaultProps = {
  required: false,
  apiError: "",
  isUpperCase: false
}

export default TextField;