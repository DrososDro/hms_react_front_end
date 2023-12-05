import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../ui/Spinner'
import { useMutation } from '@tanstack/react-query'
import { activate } from '../services/api/apiUser'
import { useEffect } from 'react'

export default function Activate() {
  const { token, uidb } = useParams()
  const navigate = useNavigate()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => activate(uidb, token),
  })
  useEffect(
    function () {
      if (token && uidb) mutate()
      if (isSuccess) navigate('/login')
    },
    [mutate, token, uidb, isSuccess, navigate],
  )
  if (isPending) {
    return <Spinner />
  }
  return (
    <div className='flex h-screen items-center justify-center text-2xl text-red-600'>
      Activation fail try again later or try to Register again after an hour
    </div>
  )
}
