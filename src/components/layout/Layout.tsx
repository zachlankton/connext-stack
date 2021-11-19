import Header from "./Header";
import Footer from "./Footer";
import React, { FC } from "react";
import SideBar from "./SideBar";
import Main from "./Main";

const Layout: FC<{}> = ({ children }) => {
  return (
    <>
      <Header />
      <SideBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
