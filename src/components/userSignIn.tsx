import { useSession, signIn, signOut } from "next-auth/react";
import { useAppDispatch } from "src/store/hooks";
import {
  setUserLoggedIn,
  setUserLoggedOut,
} from "src/store/slices/userSessionSlice";
import { Session } from "next-auth";
import { useEffect } from "react";

export default function User() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const SignOutComp = ({ session }: { session: Session }) => (
    <>
      <span className="signed-in-as">Signed in as {session.user?.email}</span>
      <br />
      <button className="sign-out" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );

  const SignInComp = () => (
    <>
      Not signed in <br />
      <button className="sign-in" onClick={() => signIn()}>
        Sign in
      </button>
    </>
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
