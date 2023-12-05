import { useQuery } from '@tanstack/react-query'
import { getWorkDay } from '../../services/api/apiShifts'
export { useWorkDay }

function useWorkDay() {
  const {
    data: workDays = {},
    error,
    isLoading: workDaysLoading,
  } = useQuery({
    queryKey: ['workday'],
    queryFn: getWorkDay,
  })
  return { workDays, error, workDaysLoading }
}
