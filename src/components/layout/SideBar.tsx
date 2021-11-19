import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import useWindowSize from "src/hooks/useWindowSize";
import { toggleSidebar } from "@/store/slices/sidebarSlice";

export default function Sidebar() {
  const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  function checkShouldClose() {
    if (width < 900) dispatch(toggleSidebar());
  }
  return (
    <section
      className={`sidebar blue-3 ${showSidebar}`}
      onClick={checkShouldClose}
    >
      <ul>
        <Link href="/">
          <a>
            <li>Home</li>
          </a>
        </Link>
        <Link href="/user-profile">
          <a>
            <li>User Profile</li>
          </a>
        </Link>
        <Link href="/docs/colors">
          <a>
            <li>Colors</li>
          </a>
        </Link>
      </ul>
    </section>
  );
}
