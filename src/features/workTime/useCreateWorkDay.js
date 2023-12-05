import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWorkDay as createWorkDayApi } from '../../services/api/apiShifts'
import toast from 'react-hot-toast'

export default function useCreateWorkDay(setNonField) {
  const queryclient = useQueryClient()
  const {
    mutate: createWorkDay,
    isPending,
    error: createWorkDayError = '',
  } = useMutation({
    mutationFn: (payload) => createWorkDayApi(payload),
    onSuccess: () => {
      queryclient.invalidateQueries('warkday'), setNonField?.('')
      toast.success('Work Day created successfuly')
    },
  })
  return { createWorkDay, isPending, createWorkDayError }
}
