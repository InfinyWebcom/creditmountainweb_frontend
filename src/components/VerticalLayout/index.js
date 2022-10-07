import PropTypes from "prop-types";
import React, { useEffect } from "react";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = prop => {

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={()=>{}} />
        <Sidebar
          type={''}
        />
        <div className="main-content">{prop.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout
