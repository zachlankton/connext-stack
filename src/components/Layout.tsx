import Header from "./Header";
import Footer from "./Footer";
import React, { FC } from "react";

const Layout: FC<{}> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
