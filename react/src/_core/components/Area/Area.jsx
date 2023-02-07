import PropTypes from 'prop-types';

export default function Area({ label, className, children }) {
  return (
    <div className={'relative border rounded p-1 ' + (className)}>
      <label
        className='absolute font-roboto flex justify-center font-semibold text-sky-700 pt-1 px-3 bg-white rounded-t-md border-t border-l border-r  '
        style={{ marginTop: -29, fontSize: '8pt', minWidth: 64 }}
      >
        {label}
      </label>
      <div className="mt-4">{children}</div>
    </div>    
  )
}

Area.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
};