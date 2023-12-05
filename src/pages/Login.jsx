import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Svg from '../ui/Svg'
import useLogin from '../features/useLogin'
import Form from '../ui/Form'
import FormRow from '../ui/FormRow'
import useRegister from '../features/users/useRegister'
import Spinner from '../ui/Spinner'
import Input from '../ui/FormInput'
const Logo = styled(Svg)`
  color: var(--green-700);

  width: 15rem;
`
export default function Login() {
  const { register, handleSubmit, reset, formState, setError, getValues } =
    useForm()
  const { registerError, registerMutate, registerData, registerPending } =
    useRegister()
  const { errors } = formState
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'
  const navigate = useNavigate()
  const { loginMutate, loginData, loginError, loginPending } = useLogin()

  function onSubmit(payload) {
    if (isLogin) {
      loginMutate(payload)
    } else {
      registerMutate(payload, {
        onError: function () {
          setError('email', {
            type: 'custom',
            message: registerError?.response?.data?.email[0],
          })
        },
        onSuccess: () => reset(),
      })
    }
  }
  useEffect(
    function () {
      if (loginData.access && loginData.refresh) {
        navigate('/')
      }
    },
    [loginData, navigate],
  )
  return (
    <section className='flex h-screen items-center justify-center bg-slate-50 text-xl text-slate-900 '>
      <fieldset disabled={registerPending || loginPending} className='relative'>
        {(registerPending || loginPending) && <Spinner />}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='text-2xl italic'>
              {isLogin ? 'Login to' : 'Register to'}
            </h2>
            <Logo />
          </div>

          {registerData.email && (
            <div className='rounded-lg  p-2 text-slate-900 '>
              <p>Your Account Created successfully </p>
              <p>We sent an email with activations</p>
              <p> details!</p>
            </div>
          )}
          <FormRow label='Email' error={errors?.email?.message}>
            <Input
              id='email'
              name='Email'
              type='email'
              autoFocus
              autoComplete='email'
              {...register('email', {
                required: 'This field is required',
              })}
            />
          </FormRow>
          <FormRow label='password' error={errors?.password?.message}>
            <Input
              name='password'
              id='password'
              {...register('password', {
                required: 'This field is required',

                minLength: {
                  value: 8,
                  message: 'Password must have more than 8 chars',
                },
              })}
              autoComplete='password'
              type='password'
            />
          </FormRow>
          {loginError ? (
            <div className='text-center text-red-600'>Invalid Credentials</div>
          ) : (
            ''
          )}

          {!isLogin && (
            <FormRow
              label='Confirm password'
              error={errors?.password_confirm?.message}
            >
              <Input
                name='password_confirm'
                id='password_confirm'
                {...register('password_confirm', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords mismatch',
                })}
                autoComplete='password'
                type='password'
              />
            </FormRow>
          )}
          <div className='my-4 flex items-center justify-between px-2 text-base'>
            <p className=' text-slate-400'>
              {isLogin
                ? "Don't Have an account ?"
                : 'Already have an account ?'}{' '}
            </p>
            <Link
              className='px-2 text-sky-600 hover:text-sky-500'
              to={isLogin ? '/register' : '/login'}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Link>
          </div>
          <button className='rounded-2xl  bg-sky-400/30 p-4 hover:bg-sky-400/60 active:bg-sky-400/60'>
            {isLogin ? 'Sign In' : 'Sign up'}
          </button>
        </Form>
      </fieldset>
    </section>
  )
}
