import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import { useOptionalUser } from './lib/app-utils'
import styles from './styles/app.css'
import { isAuthenticated } from './utils/auth/auth.server'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export async function loader({request}:LoaderArgs){
const user = await isAuthenticated(request)
return json({user})
}
export default function App() {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary() {

    let error = useRouteError();
    return isRouteErrorResponse(error) ? (
      <p>
        {error.status} {error.data}
      </p>
    ) : (

      <p>{error.message}</p>
      )
}

export function CatchBoundary() {
  return (
    <div>
      <h1>ROOT CATCH</h1>
    </div>
  )
}
