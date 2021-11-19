import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function sidebar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getSession({ req });
  console.log("USER:", user);
  res.status(200).json({});
}
