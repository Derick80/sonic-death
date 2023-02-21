import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'

type Props = {
  authType: 'register' | 'login'
}

const actionMap: Record<Props['authType'], { button: string; url: string }> = {
  register: {
    url: '/register',
    button: 'Sign up'
  },
  login: {
    url: '/login',
    button: 'Log in'
  }
}

export const AuthForm = ({ authType }: Props) => {
  const action = useActionData()
  const [searchParams] = useSearchParams()
  const { button, url } = actionMap[authType]

  const token = searchParams.get('token')
  const redirectTo = searchParams.get('redirectTo')

  useEffect(() => {
    if (action && action.message) {
      alert(action.message)
    }
  }, [action])

  return (
    <Form
      className='mx-auto flex w-full flex-col items-center justify-center'
      method='post'
      action={url}
    >
      <input type='hidden' name='redirectTo' value={redirectTo || '/'} />
      <input type='hidden' name='token' value={token || ''} />

     <input type='email' name='email' placeholder='Email' />
      <input type='password' name='password' placeholder='Password' />
      {authType === 'register' && (
        <input type='text' name='username' placeholder='Username' />
      )}


      <button className='btn-base btn-outline mb-2' type='submit'>
        {button}
      </button>
    </Form>
  )
}
