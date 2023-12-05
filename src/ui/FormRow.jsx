import PropTypes from 'prop-types'

export default function FormRow({ children, label, error }) {
  return (
    <div className='flex w-full flex-col gap-0.5 '>
      <label className='px-4 text-base capitalize' htmlFor={children.props.id}>
        {label}
      </label>
      {children}
      {error ? (
        <span className=' text-center text-base font-semibold text-red-700 '>
          {error}
        </span>
      ) : (
        ''
      )}
    </div>
  )
}

FormRow.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  error: PropTypes.string,
}
