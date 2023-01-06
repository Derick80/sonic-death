import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import styles from './styles/app.css'
import { getUser } from './utils/user.server'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export async function loader({request}:LoaderArgs){
const user = await getUser(request)
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
