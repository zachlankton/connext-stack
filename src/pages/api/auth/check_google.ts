/* This route can be safely deleted
 this is just here as an initial helper 
 to display on the main page if 
 google credentials are not setup */

import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line no-unused-vars
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.GOOGLE_ID === undefined) {
    res.send("undefined");
    return;
  }
  if (process.env.GOOGLE_SECRET === undefined) {
    res.send("undefined");
    return;
  }
  res.send("defined");
}
