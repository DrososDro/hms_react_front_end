import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import useUser from '../features/users/useUser'
import { useQueryClient } from '@tanstack/react-query'

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const queryclient = useQueryClient()
  const { failureReason, isLoading } = useUser()
  useEffect(
    function () {
      if (
        (failureReason &&
          (failureReason.request?.status === 400 ||
            failureReason.response?.status === 401)) ||
        (failureReason?.message.includes(
          'Cannot read properties of undefined',
        ) &&
          failureReason?.name === 'TypeError')
      ) {
        queryclient.clear('users')
        navigate('/login')
      }
    },
    [navigate, failureReason, isLoading, queryclient],
  )
  if (isLoading) return <div>loading</div>

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
}
