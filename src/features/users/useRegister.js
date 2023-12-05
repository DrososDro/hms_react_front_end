import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createUser } from '../../services/api/apiUser'

export default function useRegister() {
  const {
    mutate: registerMutate,
    isPending: registerPending,
    data: registerData = {},
    error: registerError,
  } = useMutation({
    mutationFn: (payload) => createUser(payload),
    onSuccess: () => toast.success('Register is Successfull'),
    onError: () => {
      toast.error('Sign up failed try again')
    },
  })
  return { registerMutate, registerData, registerError, registerPending }
}
