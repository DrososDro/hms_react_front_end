import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../services/api/apiUser'
export default function useUser() {
  const {
    data: userData = {},
    failureReason,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],

    queryFn: getUser,

    retry: false,
    // 1000 ms = second
    refetchInterval: 20 * 60 * 1000,
  })
  return { userData, failureReason, isLoading, error }
}
