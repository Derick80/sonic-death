import { Form, NavLink } from '@remix-run/react'
import { useOptionalUser } from '~/lib/app-utils'

export default function Index() {
  const user = useOptionalUser()
  return (
    <div className='flex flex-col items-center'>
      <h1>Welcome to Remix</h1>
      {user && <>
      <p
        className='text-center text-sm italic'
      >
        Hello, {user.username}</p>
        <p>You are logged in as {user.email}</p>
      </>}
      <ul>
        <li>
          <a
            target='_blank'
            href='https:github.com/Derick80/sonic-death'
            rel='noreferrer'
          >
            Template Repository
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
        <li>
          <a target='_blank' href='https://icons.radix-ui.com/' rel='noreferrer'>
            Radix Icons
          </a>

        </li>
        <li>
          <a target='_blank' href='https://tailwindcss.com/' rel='noreferrer'>
            Tailwind CSS
          </a>

        </li>
        <li>
          <a target='_blank' href='https://prisma.io/' rel='noreferrer'>
            Prisma
          </a>

        </li>
        <li>
          {user ? (
            <Form
              method='post'
            action='/logout'>
              <button type='submit'>Logout</button>
            </Form>
          ) : (
            <NavLink to='/login'>Login or Register</NavLink>
          )}
        </li>
      </ul>
    </div>
  )
}
