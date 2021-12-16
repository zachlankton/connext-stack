import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

interface userSessionType {
  expires: string;
  user: {};
  roles: string[];
  // eslint-disable-next-line no-unused-vars
  hasRole(role: string): boolean;
  // eslint-disable-next-line no-unused-vars
  hasNoRole(role: string): boolean;
  noPermission: {};
  notLoggedIn: boolean;
}

export type { userSessionType };

async function getUserSession(req: NextApiRequest) {
  const user = (await getSession({ req })) as unknown as userSessionType;

  const hasRole = (role: string) => {
    if (!user) return false;
    if (user && user.roles && user.roles.indexOf("ADMIN") > -1) return true;
    if (user && user.roles && user.roles.indexOf(role) > -1) return true;
    return false;
  };

  const hasNoRole = (role: string) => {
    return !hasRole(role);
  };

  const noPermission = { props: { noPermission: true } };

  const userToReturn = {
    user: {},
    expires: "",
    roles: [],
    hasRole,
    hasNoRole,
    noPermission,
    notLoggedIn: true,
  };

  if (!user) return userToReturn;
  userToReturn.notLoggedIn = false;

  return { ...userToReturn, ...user };
}

export default getUserSession;
