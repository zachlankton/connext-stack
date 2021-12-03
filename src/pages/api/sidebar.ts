import { sideBarListIF } from "@/components/layout/SideBarList";
import type { NextApiRequest, NextApiResponse } from "next";
import getUserSession from "src/utils/getUserSession";

export default async function sidebar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserSession(req);

  const list: sideBarListIF = [
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

  if (user && user.hasRole("ADMIN")) {
    list.push({
      icon: "FaUsersCog",
      link: "/admin",
      text: "Admin",
    });
  }

  res.status(200).json(list);
}
