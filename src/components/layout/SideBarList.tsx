import SideBarListItem, { sideBarListItemPropsIF } from "./SideBarListItem";

export interface sideBarListIF extends Array<object> {
  [index: number]: sideBarListItemPropsIF;
}
[];

export interface sideBarListPropsIF {
  list: sideBarListIF;
}
export default function SideBarList({ list }: sideBarListPropsIF) {
  return (
    <ul>
      {list.map((li, idx) => (
        <SideBarListItem key={idx} li={li as sideBarListItemPropsIF} />
      ))}
    </ul>
  );
}
