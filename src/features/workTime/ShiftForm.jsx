import Input from '../../ui/FormInput'
import FormRow from '../../ui/FormRow'
import Form from '../../ui/Form'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import useCreateShift from './useCreateShift'
import Spinner from '../../ui/Spinner'

export default function ShiftForm({ onCloseModal }) {
  const { register, handleSubmit } = useForm()
  const { createShift, shiftIsPending } = useCreateShift()
  function onSubmit(payload) {
    createShift(payload, {
      onSuccess: onCloseModal(),
    })
  }
  if (shiftIsPending) return <Spinner />
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-2xl'>Create new shift</h2>
      <FormRow label='Start of Shift'>
        <Input
          id='start_of_shift'
          autoFocus
          name='start_of_shift'
          {...register('start_of_shift')}
          type='time'
        />
      </FormRow>

      <FormRow label='End of Shift'>
        <Input
          id='end_of_shift'
          name='end_of_shift'
          {...register('end_of_shift')}
          type='time'
        />
      </FormRow>
      <div className='flex items-center justify-between'>
        <button
          onClick={() => onCloseModal()}
          className='rounded-2xl p-4 hover:bg-red-400/60 active:bg-sky-400/60'
          type='reset'
        >
          Cancel
        </button>
        <button className='rounded-2xl bg-sky-400/30 p-4 hover:bg-sky-400/60 active:bg-sky-400/60'>
          Create Shift
        </button>
      </div>
    </Form>
  )
}

ShiftForm.propTypes = {
  onCloseModal: PropTypes.any,
}
