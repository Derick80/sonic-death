import { NavLink } from '@remix-run/react'

export default function Index() {
  return (
    <div className='flex flex-col items-center'>
      <h1>Welcome to Remix</h1>
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
          <NavLink to='/login'>Login or Register</NavLink>
        </li>
      </ul>
    </div>
  )
}
