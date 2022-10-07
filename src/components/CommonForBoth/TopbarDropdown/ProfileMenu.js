import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
// Redux
import { useHistory, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(false)
  const [username, setusername] = useState("Admin")

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push('/login')
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="#" onClick={handleLogout} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu
