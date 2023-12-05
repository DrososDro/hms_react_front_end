import FormRow from '../../ui/FormRow'
import PropTypes from 'prop-types'
import Input from '../../ui/FormInput'
import { dayConvert } from '../../helpers/helpers'
export default function DetailsWorkDay({ data, shift, onCloseModal }) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-center text-2xl'>Work Day Details</h2>
      <FormRow label='Day'>
        <Input
          type='text'
          name='day'
          id='day'
          readOnly={true}
          value={dayConvert(data.day)}
        />
      </FormRow>
      <FormRow label='Start of work'>
        <Input
          id='start_of_work'
          name='start_of_work'
          type='time'
          readOnly={true}
          value={data.start_of_work || ''}
        />
      </FormRow>

      <FormRow label='End of work'>
        <Input
          id='end_of_work'
          readOnly={true}
          value={data.end_of_work || ''}
          name='end_of_work'
          type='time'
        />
      </FormRow>
      <FormRow label='Date'>
        <Input
          id='date'
          name='date'
          readOnly={true}
          value={data.date}
          type='date'
        />
      </FormRow>
      <FormRow label='comment'>
        <Input
          id='comment'
          readOnly={true}
          name='comment'
          value={data.comment || ''}
          type='text'
        />
      </FormRow>
      <FormRow label='shift'>
        <Input
          value={`${shift.start_of_shift}-${shift.end_of_shift}`}
          readOnly={true}
          type='text'
          name='shift'
          id='shift'
        />
      </FormRow>

      <div className='flex items-center justify-between'>
        <button
          onClick={onCloseModal}
          className='rounded-2xl p-4 hover:bg-sky-400/60 active:bg-sky-400/60'
          type='reset'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

DetailsWorkDay.propTypes = {
  data: PropTypes.any,
  shift: PropTypes.any,
  onCloseModal: PropTypes.any,
}
