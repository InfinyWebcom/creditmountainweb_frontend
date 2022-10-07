import React from "react";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/crlogo.png";
import logoSmall from "../../assets/images/logos/logo-small.png";

const Sidebar = () => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box navbar-header-color vertical-collps">
          <Link to="/" className="logo logo-light">
            <span className="logo-lg logo-sidebar-name">
              <img src={logo} alt="" height="40" />
            </span>
            <span className="logo-sm">
              <img src={logoSmall} alt="" height="30" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
