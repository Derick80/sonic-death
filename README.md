# Sonic Death Stack

- Prisma, Postgresql, Tailwind, Prettier + TailwindPrettier + Radix Icons + esLint + Remix-Auth (email/password login, Github and Discord login)

- ## Auth

  - Note that trying to use 2 social logins that have the same email address will cause one of the logins to fail
  - [Remix-Auth](https://github.com/sergiodxa/remix-auth)
  - [Remix-Auth-Github](https://github.com/sergiodxa/remix-auth-github)
  - [Remix-Auth-Form](https://github.com/sergiodxa/remix-auth-form)
  - [Remix-Auth-Discord](https://github.com/JonnyBnator/remix-auth-discord)

### Discord Login

- [Register your app](https://discord.com/developers/applications)
- Update env vars (see .env-example)

### Github Login

- [Register your app](https://github.com/settings/developers)
- Update env vars (see .env-example)

### Styles and Icons

- [Tailwindcss](https://tailwindcss.com/)
- [Radix Icons](https://icons.radix-ui.com/)
- Roboto Font added to app.css

## Using this template

- In your terminal paste the command below

```{bash}
npx create-remix@latest --template Derick80/sonic-death
```

- Add a .env file to the root folder or update the name and content of the .env-example
- Modify the seed.ts file if you'd like to change the first user information
- Push prisma schema to the database

```{bash}
npx prisma db push
```

- Seed the database (optional)

```{bash}
npx prisma db seed
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
