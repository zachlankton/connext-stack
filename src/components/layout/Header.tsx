import User from "src/components/userSignIn";
import Link from "next/link";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";

function SideBarBtn() {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);
  const menuButtonProps = {
    className: "icon",
    style: { width: 50, height: 50, margin: 5 },
    onClick: () => dispatch(toggleSidebar()),
  };

  return (
    <>
      {showSidebar ? (
        <AiOutlineMenuFold {...menuButtonProps} />
      ) : (
        <AiOutlineMenuUnfold {...menuButtonProps} />
      )}
    </>
  );
}

export default function Header() {
  return (
    <header className="blue-5">
      <section className="left">
        <SideBarBtn />
      </section>
      <section className="mid">
        <Link href="/">
          <a>
            <h3>Connext Stack!</h3>
          </a>
        </Link>
      </section>
      <section className="right">
        <User />
      </section>
    </header>
  );
}
