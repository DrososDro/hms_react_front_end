import { useForm } from 'react-hook-form'
import { useWorkDay } from '../features/workTime/useWorkDay'
import Form from '../ui/Form'
import Input from '../ui/FormInput'
import FormRow from '../ui/FormRow'
import Spinner from '../ui/Spinner'
import { useMutation } from '@tanstack/react-query'
import { getWorkdayCalcApi } from '../services/api/apiShifts'
import { isEmptyObject } from '../helpers/helpers'

export default function WorkDayCalculator() {
  const { workDays, workDaysLoading } = useWorkDay()
  const { register, formState, handleSubmit } = useForm()
  const {
    mutate,
    data = {},
    isPending,
  } = useMutation({
    mutationFn: (payload) => getWorkdayCalcApi(payload),
  })
  function onSubmit(payload) {
    mutate(payload)
    return
  }
  const { errors } = formState
  if (workDaysLoading || isPending) return <Spinner />
  return (
    <>
      <div>
        <Form className='mx-auto w-3/4' onSubmit={handleSubmit(onSubmit)}>
          <FormRow label='From Date' error={errors?.from_date?.message}>
            <Input
              type='date'
              name='from_date'
              {...register('from_date', {
                required: 'This field is required',
              })}
              min={workDays[0]['date']}
              max={workDays[workDays.length - 1].date}
              id='from_date'
            />
          </FormRow>
          <FormRow label='to date' error={errors?.to_date?.message}>
            <Input
              type='date'
              {...register('to_date', {
                required: 'This field is required',
              })}
              min={workDays[0]['date']}
              max={workDays[workDays.length - 1].date}
              name='to_date'
              id='to_date'
            />
          </FormRow>
          <div>
            <button className='rounded-lg bg-sky-400 px-4 py-2 font-semibold text-slate-900'>
              Calculate
            </button>
          </div>
        </Form>
      </div>
      {!isEmptyObject(data) && (
        <div className='mx-auto mt-8 flex w-3/4 flex-col gap-3 text-center'>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>overtimes</p>
            <div>{(data.overtime / 60).toFixed(2)} hours</div>
          </div>

          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>late for work</p>
            <div>{(data.late_for_work / 60).toFixed(2)} hours</div>
          </div>

          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>work days</p>
            <div>{data.workdays} Days</div>
          </div>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>job travels</p>
            <div>{data.job_travel} days</div>
          </div>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>publick holidays</p>
            <div>{data.publick_holidays} days</div>
          </div>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>sick leaves</p>
            <div>{data.sick_leaves} days</div>
          </div>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>times off</p>
            <div>{data.times_off} days</div>
          </div>
          <div className='grid grid-cols-2'>
            <p className='font-semibold capitalize'>weekends</p>
            <div>{data.weekend} days</div>
          </div>
        </div>
      )}
    </>
  )
}
