import Link from "next/link";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

export interface sideBarListItemPropsIF {
  icon: string;
  link: string;
  text: string;
}

interface liItem {
  li: sideBarListItemPropsIF;
}

export default function SideBarListItem({ li }: liItem) {
  const Icon = dynamic(
    () =>
      import("react-icons/fa").then(
        (mod) => mod[li.icon]
      ) as Promise<ComponentType>
  );

  return (
    <>
      <Link href={li.link}>
        <a>
          <li>
            <Icon />
            {li.text}
          </li>
        </a>
      </Link>
    </>
  );
}
