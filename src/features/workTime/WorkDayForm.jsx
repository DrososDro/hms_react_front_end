import Input from '../../ui/FormInput'
import FormRow from '../../ui/FormRow'
import Form from '../../ui/Form'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { choices, newDatePlusOne } from '../../helpers/helpers'
import useShifts from './useShifts'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import useCreateWorkDay from './useCreateWorkDay'
import { useWorkDay } from './useWorkDay'

export default function WorkDaysForm({ onCloseModal }) {
  const [nonField, setNonField] = useState('')
  const { shifts, isLoading } = useShifts()
  const { workDays } = useWorkDay()
  const { register, handleSubmit, setError, formState, reset } = useForm({
    defaultValues: {
      date: newDatePlusOne(workDays),
    },
  })
  const { errors: formErrors } = formState
  const { createWorkDay, isPending, createWorkDayError } =
    useCreateWorkDay(setNonField)
  useEffect(
    function () {
      if (createWorkDayError) {
        const data = createWorkDayError?.response?.data
        if (data) {
          for (let i in data) {
            if (i === 'non_field_errors') {
              setNonField(data[i])
            } else {
              setError(i.toString(), {
                type: 'validate',
                message: data[i][0].toString(),
              })
            }
          }
        }
      }
    },
    [createWorkDayError, setError, setNonField],
  )

  function onSubmit(payload) {
    for (let i in payload) {
      if (payload[i] === '') {
        payload[i] = null
      }
    }
    createWorkDay(payload, {
      onSuccess: () => {
        reset()
      },
    })
  }

  if (isPending || isLoading) return <Spinner />
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-2xl'>Create new Work Day</h2>
      <FormRow label='Day' error={formErrors?.day?.message}>
        <Input as='select' name='day' id='day' {...register('day')}>
          {choices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.choice}
            </option>
          ))}
        </Input>
      </FormRow>
      {nonField ? (
        <span className=' w-full text-center text-base font-semibold text-red-700 '>
          {nonField}
        </span>
      ) : (
        ''
      )}
      <FormRow error={formErrors?.start_of_work?.message} label='Start of work'>
        <Input
          id='start_of_work'
          name='start_of_work'
          {...register('start_of_work')}
          type='time'
        />
      </FormRow>

      <FormRow error={formErrors?.end_of_work?.message} label='End of work'>
        <Input
          id='end_of_work'
          name='end_of_work'
          {...register('end_of_work')}
          type='time'
        />
      </FormRow>
      <FormRow label='Date' error={formErrors?.date?.message}>
        <Input id='date' name='date' {...register('date')} type='date' />
      </FormRow>
      <FormRow label='comment' error={formErrors?.comment?.message}>
        <Input
          id='comment'
          name='comment'
          {...register('comment')}
          type='text'
        />
      </FormRow>
      <FormRow label='shift' error={formErrors?.shift?.message}>
        <Input as='select' name='shift' id='shift' {...register('shift')}>
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {`${shift.start_of_shift}-${shift.end_of_shift}`}
            </option>
          ))}
        </Input>
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
          Create workday
        </button>
      </div>
    </Form>
  )
}

WorkDaysForm.propTypes = {
  onCloseModal: PropTypes.any,
}
