import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const SimpleDropDown = ({
  name,
  value,
  data,
  optionKey,
  optionValue,
  className,
  disabled,
  apiError,
  onChangeCallback,
  onBlurCallback,
  hidden }) => {

  const getClassName = () => {
    return className + ' ' + theme.simpleDropDown[(disabled ? "disabled" : "enabled")]
  }

  const getOptionValue = (el, optionValue) => {
    let cols = optionValue.split(",");
    if (cols.length > 1) {
      return el[cols[0]] + ": " + el[cols[1]];
    } else {
      return el[cols[0]];
    }
  }

  return (
    <div className={className + (hidden ? " hidden" : "")}>
      <select
        name={name}
        value={value || ''}
        className={getClassName()}
        onChange={e => onChangeCallback(e)}
        onBlur={e => onBlurCallback(e)}
      >
        <option></option>
        {
          Array.isArray(data) && data.map(el => <option key={el.id} value={el[optionKey]}>{getOptionValue(el, optionValue)}</option>)
        }
      </select>
      <div className={(apiError !== "" && apiError[name]) ? "text-xs text-red-400 font-publicSans pt-1" : "hidden"}>{apiError[name]}</div>
    </div>
  )
}

SimpleDropDown.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  optionKey: PropTypes.string,
  optionValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

SimpleDropDown.defaultProps = {
  disabled: false,
  apiError: "",
  className: ""
}

export default SimpleDropDown;