import { useAppDispatch, useAppSelector } from "@/store/hooks";

import useWindowSize from "src/hooks/useWindowSize";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";

import SideBarList, { sideBarListIF } from "./SideBarList";
import { useMemo } from "react";

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

export default function Sidebar() {
  const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);
  const sideBarBreakWidth = 900;
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth >= sideBarBreakWidth) {
      dispatch(toggleSidebar());
    }
  }, [dispatch]);

  function checkShouldClose() {
    if (width < sideBarBreakWidth) dispatch(toggleSidebar());
  }

  return (
    <section
      className={`sidebar blue-3 ${showSidebar}`}
      onClick={checkShouldClose}
    >
      {useMemo(
        () => (
          <SideBarList list={myList} />
        ),
        []
      )}
    </section>
  );
}
