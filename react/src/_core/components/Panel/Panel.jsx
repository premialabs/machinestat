import PropTypes from 'prop-types';

export default function Panel({ className, children }) {
  return (
    <div className={className}>{children}</div>
  )
}

Panel.propTypes = {
  className: PropTypes.string
};