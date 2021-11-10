import User from "src/components/userSignIn";
import Link from "next/link";

export default function Layout() {
  return (
    <header className="blue-5">
      <section className="left"></section>
      <section className="mid">
        <Link href="/">
          <a>
            <h3>Connext Stack!</h3>
          </a>
        </Link>
      </section>
      <section className="right">
        <User />
      </section>
    </header>
  );
}
