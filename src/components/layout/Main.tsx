import { useAppSelector } from "@/store/hooks";
import React, { FC } from "react";

const Main: FC<{}> = ({ children }) => {
  const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);

  return <main className={`main-content ${showSidebar}`}>{children}</main>;
};

export default Main;
