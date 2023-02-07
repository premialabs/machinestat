import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const DateTimeField = ({
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
  isUpperCase,
  hidden
}) => {
  const getClassName = () => {
    return 'w-full font-poppins text-xs placeholder-blue-500 text-' +
      textAlign + ' ' +
      theme.textBox[(disabled ? "disabled" : "enabled")] +
      ((apiError !== "" && apiError[name]) ? " bg-red-50" : "") +
      (isUpperCase ? " uppercase " : "")
  }

  return (
    <div className={className + (hidden ? " hidden": "")} >
      <input
        placeholder="MM/DD/YYYY --:-- --"
        required={required}
        name={name}
        value={value}
        type="datetime-local"
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

DateTimeField.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isUpperCase: PropTypes.bool
};

DateTimeField.defaultProps = {
  required: false,
  apiError: "",
  isUpperCase: false
}

export default DateTimeField;