import React, { useEffect, useState } from "react"
import { ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { useHistory } from "react-router-dom"

const NewButtonDropdown = (prop) => {
    const {user, toggleEdit, toggleDelete, setSelectedUser} = prop;
    const [viewBtn, setViewBtn] = useState(false);
    const history = useHistory();
    return (
        <div className="btn-group mb-2 dropstart">
            <ButtonDropdown
                isOpen={viewBtn}
                toggle={() => { setViewBtn(!viewBtn) }}
            >
                <DropdownToggle
                    caret
                    color="theme"
                    className="btn btn-sm text-white"
                    style={{backgroundColor:'#03ADEF'}}
                >
                    Actions &nbsp;{" "}
                    <i className="mdi mdi-chevron-down" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={()=> history.push(`/users/details/${user._id}`)}>- View</DropdownItem>
                    <DropdownItem onClick={() => {toggleEdit(); setSelectedUser(user)}}>- Edit</DropdownItem>
                    <DropdownItem onClick={() => {toggleDelete(); setSelectedUser(user)}}>- Delete</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    )
}

export default NewButtonDropdown