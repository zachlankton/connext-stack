# Connext Stack

Connext Stack is a stack comprised of Couchbase, Ottoman ODM, Node.js, and Next.js.
This is meant to be an opinionated quick start template with batteries included.

## Table of Contents:

- [Getting Started](#getting-started)
- [Quick Start Devcontainer](#quick-start-devcontainer)
- [Manual Installation](#manual-installation)
- [Running Development Server](#running-the-development-server)
- [Build and Deploy](#build-and-deploy)
- [Environment Vars](#environment-vars)
- [Full Feature List](#full-feature-list)
- [Learn More](#learn-more)

---

# Getting Started

First click `Use This Template` above the file list to effectively create a clone in your own repository.

![Use this Template](https://docs.github.com/assets/images/help/repository/use-this-template-button.png)

# Quick Start Devcontainer

This repo comes with a VS Code devcontainer configuration that allows for quick turnkey multicontainer dev environment setup that includes couchbase/server-sandbox. To use this you can use [github codespaces](https://docs.github.com/en/codespaces) (costs money) or use [VS Code and remote - containers extension](https://code.visualstudio.com/docs/remote/containers) and [docker](https://docs.docker.com/get-docker/) `Note: Cypress Test GUI (npm run cypress) does not work inside a devcontainer, but headless testing does (npm run test:cypress)`

### Steps Overview

1. Open a new window in VS Code
2. Press F1 to bring up the command pallette
3. type in `clone repo in container` press enter
4. type in your github repo and press enter
5. Wait awhile and Profit!

---

### Steps Detailed

---

### Steps 1-3

Open a new window in VS Code and hit `F1` key to bring up the command pallette and type in `clone repo in container` and hit enter and you will be prompted to enter the repo name or url:

![VS Code Clone Repo in Container](https://code.visualstudio.com/assets/docs/remote/containers/vscode-remote-try-node.png)

---

### Steps 4-5

Enter the name of your repo that you created in the first step when you cloned the template and hit enter. You should see this pop up in the lower right corner of your editor, you can click on the blue highlighted "Starting with Dev Container" link to pull up the terminal output to see the progress. I recommend doing this as it can take a fair bit of time to set this up for the first time.

![VS Code Starting in Container](https://code.visualstudio.com/assets/docs/remote/containers/dev-container-progress.png)

If all went well you should see something like this:

![connext-devcontainer-success](https://user-images.githubusercontent.com/2927894/142852771-fa1e5dbd-f118-4482-8d10-58501aada2f0.PNG)

---

# Manual Installation

## Prerequisites

- Need to have docker desktop or docker (linux) installed to run a couchbase server
- OR a couchbase installation that you have network access to (setup in .env.local)

If you want to spin up a quick couchbase docker container that will work with connext stack out of the box you can run the below command.

```bash
docker run -d --name couchbase-sandbox -p 8091-8094:8091-8094 -p 11210:11210 couchbase/server-sandbox:7.0.0
```

## Installation and Setup

After cloning the template to your own repo you can then clone your repo into your local machine and run:

```bash
npm install
cp .env.example .env.local
npm run seed
```

This should work mostly out of the box, but there may be other dependencies required depending on your machine and setup. My approach is to try something and then if it doesn't work there is usually some helpful output about which dependencies are missing, then from there attempt to install them. But here is a list of dependencies that may be required:

- [Cypress Deps](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)
- [Github Pages Deps](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
  - [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
  - [Bundler](https://bundler.io/)
  - [Jekyll](https://jekyllrb.com/)

---

# Running the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

---

# Build and Deploy

Refer to next.js docs for more detailed information about going to production and deploying.

- [Next.js Going to Production](https://nextjs.org/docs/going-to-production)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

```bash
npm run build
npm run start
```

---

# Environment Vars

`IMPORTANT! ANY CHANGES TO ENVIRONMENT VARIABLES REQUIRES A SERVER RESTART TO TAKE EFFECT!`

An example .env file can be found in the root of this repo at `.env.example`. For a quick start just rename or make a copy of this file to `.env.local` (This is done automatically in the devcontainer setup) and make the changes that you need for your project.

For Next.js specific information about other useful environment variable setups see [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Couchbase Connection Vars

```bash
COUCHBASE_CONNECTION=couchbase://localhost
COUCHBASE_BUCKET=connext
COUCHBASE_USER=Administrator
COUCHBASE_PW=password
#DEBUG=true # Uncomment this to see couchbase queries output to the console
```

## Next auth Google Oauth Provider ID and secret

[Next-Auth](https://next-auth.js.org/) is included in this package and setup for a quickstart with google sign on, just need to setup [google oauth credentials](https://console.cloud.google.com/apis/credentials) and provide the id and secret in the environment variables file.

The `SECRET` variable is used by next auth for [hashing tokens, sign/encrypt cookies and generate cryptographic keys](https://next-auth.js.org/configuration/options#secret)

```bash
# To enable next auth google sign on
# --> Setup oath with your google account to get an ID and secret to put here
NEXTAUTH_URL=http://localhost:3000
#SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
#GOOGLE_ID=xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
#GOOGLE_SECRET=XXXXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

See the [Next-Auth Documenation](https://next-auth.js.org/getting-started/example) for setting up other providers like github, facebook, twitter, etc.

## Cypress Testing Variables

In the cypress starter tests (`testing/cypress/integration/main-page.spec.ts`) there are units for testing the google sign on workflow. After setting up google credentials above you can specify a test email user and password in the environment vars to use for testing.

`NOTE: THE GOOGLE SIGN ON TESTS WILL ONLY RUN IF THE CYPRESS_GOOGLE_USER AND CYPRESS_GOOGLE_PW VARS ARE SET --- THIS PREVENTS FAILED TESTS WHEN THIS IS NOT SETUP`

```bash
##Cypress Testing Environment
#CYPRESS_GOOGLE_USER=testuser@gmail.com
#CYPRESS_GOOGLE_PW=1234567890
CYPRESS_COOKIE_NAME=next-auth.session-token
CYPRESS_SITE_NAME=http://localhost:3000
```

This email should have any 2 factor authentication disabled so that the tests will run headless. If you have trouble with this test you will need to do a manual installation on your local machine so that the cypress GUI will run and make the following changes to the `main-page.spec.ts`:

```javascript
// find this object definition in the test file
// and change headless to false.
const socialLoginOptions = {
  username,
  password,
  loginUrl,
  headless: true, // <--- change this to false
  logs: false,
  isPopup: false,
  loginSelector: ".sign-in",
  postLoginSelector: ".signed-in-as",
};
```

You can then run `npm run cypress` to open the GUI and watch the test run, a separate window should open when trying to log in and you should be able to see what is failing. Usually, it is google trying to get you to confirm your signing on to a new unknown device... sometimes you have to go into your google account settings and enable 2 factor authentication and disable it again as well as making sure you have no backup email or phone number setup.

---

# Full Feature List

The following additional goodies are included in this package:

- Quickstart with devcontainer config!
- Typescript (Just learn it! It is totally worth it!)
- Github Pages with Jekyll (in `docs` folder)
- Ottoman ODM DB Config with Seed file (found in `src/db`)
- Ottoman ODM Starter Models (found in `src/models`)
- Styling Examples:
  - Global Styles (in `public/` folder, implemented in `src/pages/_app.tsx` using `Next/Head` Component )
  - CSS Modules (in `src/styles` used in `src/pages/index.tsx` )
  - No front end library is included, this is where opinion ends... use what you like!
- Github Code QL Analysis Workflow
- Opinionated eslint and prettier configuration
  - npm run lint
  - npm run pretty
  - npm run pretty-check
- Opinionated Folder Structure / Organization
- Next-Auth (just need to add google id and secret)
- Next-Auth-Couchbase-Adapter
- Redux Toolkit (starter code in `src/store`)
- React Icons
- Jest Testing Library (starter tests in `testing/__tests__`)
- Cypress Testing Library (starter tests in `testing/cypress/integration`)
- Code Coverage pre-configured for
  - npm run test:jest --> output to `coverage_jest`
  - npm run test:cypress --> output to `coverage_cypress`
  - npm run test:all --> output to `docs/coverage`

---

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
