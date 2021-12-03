import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

// type hasRoleFn = (role: string) => boolean;

interface userSessionType {
  expries: string;
  user: {};
  roles: string[];
  // eslint-disable-next-line no-unused-vars
  hasRole(role: string): boolean;
}

export type { userSessionType };

async function getUserSession(req: NextApiRequest) {
  const user = (await getSession({ req })) as unknown as userSessionType;
  if (!user) return null;
  user.hasRole = (role) => {
    if (user && user.roles && user.roles.indexOf(role) > -1) return true;
    return false;
  };
  return user;
}

export default getUserSession;
