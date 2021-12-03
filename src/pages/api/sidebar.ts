import { sideBarListIF } from "@/components/layout/SideBarList";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function sidebar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const myList: sideBarListIF = [
    {
      icon: "FaHome",
      link: "/",
      text: "Home",
    },
    {
      icon: "FaUserAlt",
      link: "/user-profile",
      text: "User Profile",
    },
    {
      icon: "FaPalette",
      link: "/docs/colors",
      text: "Colors",
    },
  ];

  const user = await getSession({ req });
  console.log("USER:", user);
  res.status(200).json(myList);
}
