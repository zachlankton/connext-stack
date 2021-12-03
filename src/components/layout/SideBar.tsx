import { useAppDispatch, useAppSelector } from "@/store/hooks";

import useWindowSize from "src/hooks/useWindowSize";
import { toggleSidebar, setList } from "@/store/slices/sidebarSlice";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";

import SideBarList from "./SideBarList";
import { useEffect, useMemo } from "react";

export default function Sidebar() {
  const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);
  const sideBarList = useAppSelector((state) => state.sidebar.list);
  const sideBarBreakWidth = 900;
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth >= sideBarBreakWidth) {
      dispatch(toggleSidebar());
    }
  }, [dispatch]);

  useEffect(() => {
    async function getSideBar() {
      const list = await (await fetch("/api/sidebar")).json();
      dispatch(setList(list));
    }
    getSideBar();
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
          <SideBarList list={sideBarList} />
        ),
        [sideBarList]
      )}
    </section>
  );
}
