import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShift as createShiftApi } from '../../services/api/apiShifts'
export default function useCreateShift() {
  const queryclient = useQueryClient()
  const { mutate: createShift, isPending: shiftIsPending } = useMutation({
    mutationFn: (payload) => createShiftApi(payload),
    onSuccess: () => {
      toast.success('Shift Created')
      queryclient.invalidateQueries('shifts')
    },
  })
  return { createShift, shiftIsPending }
}
