// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Models from "@/models/index";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await Models.UserRoles.find({
    user: process.env.CYPRESS_GOOGLE_USER,
  });
  const user = users.rows[0];
  console.log(req.query);
  if (req.query.remove !== undefined) {
    user.roles = [];
  } else if (req.query.reset != undefined) {
    user.roles = ["USER"];
  } else {
    user.roles.push("ADMIN");
  }
  const results = await user.save();
  res.status(200).json(results);
}
