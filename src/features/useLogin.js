import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getToken } from '../services/api/apiUser'

export default function useLogin() {
  const {
    mutate: loginMutate,
    data: loginData = {},
    isPending: loginPending,
    error: loginError,
  } = useMutation({
    mutationFn: (payload) => getToken(payload),
    onSuccess: () => toast.success('Sign In successfull'),
    onError: () => {
      toast.error('Invalid Credentials')
    },
  })
  return { loginMutate, loginData, loginError, loginPending }
}
