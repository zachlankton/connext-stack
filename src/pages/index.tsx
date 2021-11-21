import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAppSelector } from "src/store/hooks";
import { getUser } from "@/store/slices/userSessionSlice";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const user = useAppSelector((state) => getUser(state));

  const [googleUndefined, setGoogleDefined] = useState(true);
  useEffect(() => {
    const checkVars = async () => {
      const res = await fetch("/api/auth/check_google");
      const def = await res.text();
      if (def === "undefined") setGoogleDefined(true);
      if (def === "defined") setGoogleDefined(false);
    };
    checkVars();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <br /> <a href="https://nextjs.org">Connext Stack</a>
        </h1>
        {googleUndefined && (
          <div className="card text-centered red-5">
            <p>GOOGLE_ID and GOOGLE_SECRET are not defined in `.env.local`</p>
            <p>
              These will need to be setup to enable Next-Auth Google Sign on:{" "}
              <br />
              <a href="https://next-auth.js.org/providers/google">
                https://next-auth.js.org/providers/google
              </a>
            </p>
          </div>
        )}
        {user?.email && <p className="current-user">Hello {user?.email}</p>}

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <p className="card">
          Connext Stack is a stack comprised of Couchbase, Ottoman ODM, Node.js,
          and Next.js. <br />
          This is meant to be an opinionated quick start template with batteries
          included. <br />
          The following additional goodies are included in this package:
        </p>
        <ul>
          <li>
            <a href="https://www.typescriptlang.org/">Typescript</a> (Just{" "}
            <a href="https://www.youtube.com/watch?v=BwuLxPH8IDs">learn it!</a>{" "}
            It is totally worth it!)
          </li>
          <li><a href="https://pages.github.com/">Github Pages</a> with <a href="https://jekyllrb.com/">Jekyll</a> (in `docs` folder)</li>
          <li>Ottoman ODM DB Config with Seed file (found in `src/db`)</li>
          <li>Ottoman ODM Starter Models (found in `src/models`)</li>
          <li>Styling Examples:
            <ul>
              <li>Global Styles (in `public/` folder, implemented in `src/pages/_app.tsx` using `Next/Head` Component )</li>
              <li>CSS Modules (in `src/styles` used in `src/pages/index.tsx` )</li>
              <li>No front end library is included, this is where opinion ends... use what you like!</li>
            </ul>
          </li>
          <li>Github Code QL Analysis Workflow</li>
          <li>
            Opinionated <a href="https://eslint.org/">eslint</a> and{" "}
            <a href="https://prettier.io/">prettier</a> configuration
            <ul>
              <li>npm run lint</li>
              <li>npm run pretty</li>
              <li>npm run pretty-check</li>
            </ul>
          </li>
          <li>Opinionated Folder Structure / Organization</li>
          <li>
            <a href="https://next-auth.js.org/">Next-Auth</a> (just need to add
            google id and secret)
          </li>
          <li>
            <a href="https://www.npmjs.com/package/next-auth-couchbase-adapter">
              Next-Auth-Couchbase-Adapter
            </a>
          </li>
          <li>
            <a href="https://redux-toolkit.js.org/">Redux Toolkit</a> (starter
            code in `src/store`)
          </li>
          <li>
            <a href="https://react-icons.github.io/react-icons/">React Icons</a>
          </li>
          <li>
            <a href="https://jestjs.io/">Jest Testing Library</a> (starter tests
            in `testing/__tests__`)
          </li>
          <li>
            <a href="https://www.cypress.io/">Cypress Testing Library</a>{" "}
            (starter tests in `testing/cypress/integration`)
          </li>
          <li>
            Code Coverage pre-configured for
            <ul>
              <li>npm run test:jest {"-->"} output to `coverage_jest`</li>
              <li>npm run test:cypress {"-->"} output to `coverage_cypress`</li>
              <li>npm run test:all {"-->"} output to `docs/coverage`</li>
            </ul>
          </li>
        </ul>

        <p>For more info and docs see the cards below: </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next JS Docs &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn Next JS &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://docs.couchbase.com/home/index.html"
            className={styles.card}
          >
            <h2>Couchbase Docs &rarr;</h2>
            <p>Learn about Couchbase!</p>
          </a>

          <a href="https://ottomanjs.com/" className={styles.card}>
            <h3>Ottoman ODM Docs &rarr;</h3>
            <p>Learn about Ottoman ODM for interacting with Couchbase.</p>
          </a>

          <a
            href="https://redux-toolkit.js.org/introduction/getting-started"
            className={styles.card}
          >
            <h3>Redux Toolkit Docs &rarr;</h3>
            <p>Learn about Redux Toolkit</p>
          </a>

          <a
            href="https://react-icons.github.io/react-icons/"
            className={styles.card}
          >
            <h3>React Icons &rarr;</h3>
            <p>Learn how to use React Icons</p>
          </a>

          <a
            href="https://jestjs.io/docs/getting-started"
            className={styles.card}
          >
            <h3>Jest Test Docs &rarr;</h3>
            <p>Learn about testing with jest library</p>
          </a>

          <a
            href="https://docs.cypress.io/guides/overview/why-cypress"
            className={styles.card}
          >
            <h3>Cypress Test Docs &rarr;</h3>
            <p>Learn about testing with Cypress library</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
