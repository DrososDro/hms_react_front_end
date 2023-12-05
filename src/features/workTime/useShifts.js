import { useQuery } from '@tanstack/react-query'
import { getShifts } from '../../services/api/apiShifts'

export default function useShifts() {
  const { data: shifts = {}, isLoading } = useQuery({
    queryKey: ['shifts'],
    queryFn: getShifts,
  })
  return { shifts, isLoading }
}
