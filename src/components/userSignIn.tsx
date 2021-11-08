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
      Signed in as {session.user?.email}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );

  const SignInComp = () => (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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
