import type { ActionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { authenticator } from '~/utils/auth/auth.server'
import { logout } from '~/utils/user.server'

export async function action({ request }:ActionArgs) {

  await authenticator.logout(request, { redirectTo: '/login' })

}
export async function loader() {
  return redirect('/')
}
