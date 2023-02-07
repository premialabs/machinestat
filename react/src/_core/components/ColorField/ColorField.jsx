import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const ColorField = ({
  name,
  value,
  title,
  disabled,
  className,
  onChangeCallback,
  onBlurCallback
}) => {
  const getClassName = () => {
    return 'w-full text-' + theme.textBox[(disabled ? "disabled" : "enabled")]
  }

  return (
    <div className={className}>
      <input
        name={name}
        value={value}
        type="color"
        title={title}
        disabled={disabled}
        className={getClassName()}
        onChange={e => onChangeCallback(e)}
        onBlur={e => onBlurCallback(e)}
      />
    </div>
  )
}

ColorField.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

ColorField.defaultProps = {
  apiError: ""
}

export default ColorField;