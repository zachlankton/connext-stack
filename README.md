# Connext Stack

Connext Stack is a stack comprised of Couchbase, Ottoman ODM, Node.js, and Next.js.
This is meant to be an opinionated quick start template with batteries included.
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

# Getting Started

First click `Use This Template` above the file list to effectively create a clone in your own repository.

![Use this Template](https://docs.github.com/assets/images/help/repository/use-this-template-button.png)

# Quick Start Devcontainer

This repo comes with a VS Code devcontainer configuration that allows for quick turnkey multicontainer dev environment setup that includes couchbase/server-sandbox.  To use this you can use [github codespaces](https://docs.github.com/en/codespaces) (costs money) or use [VS Code and remote - containers extension](https://code.visualstudio.com/docs/remote/containers) and [docker](https://docs.docker.com/get-docker/) `Note: Cypress Test GUI (npm run cypress) does not work inside a devcontainer, but headless testing does (npm run test:cypress)`

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

Enter the name of your repo that you created in the first step when you cloned the template and hit enter.  You should see this pop up in the lower right corner of your editor, you can click on the blue highlighted "Starting with Dev Container" link to pull up the terminal output to see the progress.  I recommend doing this as it can take a fair bit of time to set this up for the first time.

![VS Code Starting in Container](https://code.visualstudio.com/assets/docs/remote/containers/dev-container-progress.png)

If all went well you should see something like this:

![connext-devcontainer-success](https://user-images.githubusercontent.com/2927894/142852771-fa1e5dbd-f118-4482-8d10-58501aada2f0.PNG)





---
# Manual Installation

After cloning the template to your own repo you can then clone your repo into your local machine and run:
```
npm install
```

This should work mostly out of the box, but there may be other dependencies required depending on your machine and setup.  My approach is to try something and then if it doesn't work there is usually some helpful output about which dependencies are missing, then from there attempt to install them.  But here is a list of dependencies that may be required:

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
