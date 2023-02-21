import { GitHubStrategy } from 'remix-auth-github'
import { createUser } from '~/utils/user.server'
import { getAccount } from './accountService.server'


const ghClientId = process.env.GITHUB_CLIENT_ID as string
if (!ghClientId) throw new Error('GITHUB_CLIENT_ID is not defined')

const ghClientSecret = process.env.GITHUB_CLIENT_SECRET as string
if (!ghClientSecret) throw new Error('GITHUB_CLIENT_SECRET is not defined')

export const gitHubStrategy = new GitHubStrategy(
  {
    clientID: ghClientId,
    clientSecret: ghClientSecret,
    callbackURL: 'http://localhost:3521/github/callback',
  },
  async ({ accessToken, extraParams, profile }) => {
    const account = await getAccount({
      provider: profile.provider,
      providerAccountId: profile.id,
    })

    if (account) return account.user.id

    const user = await createUser({
      email: profile.emails ? profile.emails[0].value : '',
      username: profile.displayName,
      account: {
        provider: profile.provider,
        providerAccountId: profile.id,
        accessToken: accessToken
      }
    })

    return user.id
  }
)
