import {
  useSession,
  signIn,
  signOut,
  RedirectableProvider,
} from "next-auth/react";
import { useAppDispatch } from "src/store/hooks";
import {
  setUserLoggedIn,
  setUserLoggedOut,
} from "src/store/slices/userSessionSlice";
import { Session } from "next-auth";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut, BiLogIn } from "react-icons/bi";

export default function User() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession({ required: false });

  const SignOutComp = ({ session }: { session: Session }) => (
    <>
      <div className="user-widget">
        <BiLogOut
          className="sign-out icon"
          style={{ width: 50, height: 50 }}
          onClick={() => signOut()}
        />

        <Link href="/user-profile">
          <a>
            <Image
              className="signed-in-as"
              src={session.user?.image as string}
              alt={`User Profile Pic for ${session.user?.email}`}
              width="50px"
              height="50px"
            />
          </a>
        </Link>
      </div>
    </>
  );

  const SignInComp = () => (
    <div className="user-widget">
      <BiLogIn
        className="sign-in"
        style={{ width: 50, height: 50 }}
        onClick={() => signIn("google" as RedirectableProvider)}
      />
    </div>
  );

  useEffect(() => {
    if (session) {
      dispatch(setUserLoggedIn(session));
    } else {
      dispatch(setUserLoggedOut());
    }
  }, [session, dispatch]);

  if (session) {
    return <SignOutComp session={session} />;
  } else {
    return <SignInComp />;
  }
}
