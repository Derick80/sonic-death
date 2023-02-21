import { json, createCookieSessionStorage, redirect } from '@remix-run/node'
import { prisma } from './prisma.server'
import type { RegisterForm, LoginForm } from './types.server'
import bcrypt from 'bcryptjs'
import invariant from 'tiny-invariant'
import type { Prisma } from '@prisma/client'
import { createPasswordHash } from './auth/auth-service.server'

const secret = process.env.SESSION_SECRET
if (!secret) {
  throw new Error('SESSION_SECRET is not set')
}
const defaultUserSelect = {
  id: true,
  email: true,
  username: true,
}
export const getUserPasswordHash = async (
  input: Prisma.UserWhereUniqueInput
) => {
  const user = await prisma.user.findUnique({
    where: input
  })
  if (user) {
    return {
      user: { ...user, password: null },
      passwordHash: user.password
    }
  }
  return { user: null, passwordHash: null }
}
export const createUser = async (
  input: Prisma.UserCreateInput & {
    password?: string
    account?: Omit<Prisma.AccountCreateInput, 'user'>
  }
) => {
  const data: Prisma.UserCreateInput = {
    email: input.email,
    username: input.username
  }

  if (input.password) {
    data.password = await createPasswordHash(input.password)
  }

  if (input.account) {
    data.accounts = {
      create: [
        {
          provider: input.account.provider,
          providerAccountId: input.account.providerAccountId,
          accessToken: input.account.accessToken,
          refreshToken: input.account.refreshToken
        }
      ]
    }
  }

  const user = await prisma.user.create({
    data,
    select: defaultUserSelect
  })
  return user
}

export const register = async (form: RegisterForm) => {
  const exists = await prisma.user.count({ where: { email: form.email } })

  if (exists) {
    return json(
      {
        error: `User already exists with that email`
      },
      { status: 400 }
    )
  }
  const newUser = await createUser(form)

  if (!newUser) {
    return json(
      {
        error: `somethign went wrong trying to create a user`,
        fields: {
          email: form.email,
          password: form.password,
          username: form.username
        }
      },
      { status: 400 }
    )
  }
  return createUserSession(newUser.id, '/')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'app-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [secret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}



export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

export const login = async (form: LoginForm) => {
  const user = await prisma.user.findUnique({
    where: { email: form.email },

  })
  invariant(user, 'User not found')
  const hash = user.password
  invariant(hash, 'no hash found')

  if (!user || !(await bcrypt.compare(form.password, hash))) {
    return json(
      {
        error: `Incorrect Login`
      },
      { status: 400 }
    )
  }
  return createUserSession(user.id, '/')
}

export async function getUser(input: Prisma.UserWhereUniqueInput) {

    const user = await prisma.user.findUnique({
      where: input,
      select: {
        id: true,
        email: true,
        username: true
      }
    })
    return user
}



export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}
