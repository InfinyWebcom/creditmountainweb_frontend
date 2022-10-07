import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import {
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap"
import { Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumb from "../../components/Common/Breadcrumb";
import NewButtonDropdown from "../../components/Common/NewButtonDropdown";
import AddUser from "./addUser";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";
import AppConfig from 'constants/config';
import axios from 'axios';

const Users = () => {
    const [selectedUser, setSelectedUser] = useState({});
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [data, setData] = useState([]);

    const toggleDelete = () => {
        setDeleteOpen(!deleteOpen)
    }

    const toggleEdit = () => {
        setEditOpen(!editOpen)
    }

    const toggleAdd = () => {
        setAddOpen(!addOpen)
    }

    // const data = [
    //     { _id: '1', name: 'Mark', email: 'mark@12.com' },
    //     { _id: '2', name: 'Mark', email: 'mark@12.com' },
    //     { _id: '3', name: 'Mark', email: 'mark@12.com' },
    //     { _id: '4', name: 'Mark', email: 'mark@12.com' },
    //     { _id: '5', name: 'Mark', email: 'mark@12.com' },
    //     { _id: '6', name: 'Mark', email: 'mark@12.com' },
    // ]

    //pagination customization
    const pageOptions = {
        sizePerPage: 5,
        totalSize: data.length,
        custom: true,
    }

    const defaultSorted = [{
      dataField: '_id',
      order: 'asc'
    }];

    const columns = [
        {
            dataField: "name",
            text: "Name",
        },
        {
            dataField: "email",
            text: "Email",
        },
        {
            dataField: "action",
            text: "Action",
            // eslint-disable-next-line react/display-name
            formatter: (cellContent, row) => (
                <>
                    <NewButtonDropdown user={row} setSelectedUser={setSelectedUser} toggleEdit={toggleEdit} toggleDelete={toggleDelete}/>
                </>
            ),
        },
    ]

    const { SearchBar } = Search;

    useEffect(()=> hitAxios(),[])
    const hitAxios = () => {
        axios.post(`${AppConfig.baseUrl}users/listing`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.data.error) {
                // addToast(result.data.title, { appearance: 'error', autoDismiss: true });
            } else {
                setData(result.data.details.data)
                // addToast(result.data.title, { appearance: 'success' });
            }
        }).catch(error => {
            addToast('Something went wrong, Please try again', { appearance: 'error' });
        });
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Users | Credit Mountain</title>
                </MetaTags>
                <div className="container-fluid">
                    <Breadcrumb title="Users" breadcrumbItem="Users" toggleAdd={toggleAdd} />
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                        pagination={paginationFactory(pageOptions)}
                                        keyField='_id'
                                        columns={columns}
                                        data={data}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                                keyField='_id'
                                                columns={columns}
                                                data={data}
                                                search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>

                                                        <Row className="row">
                                                            <Col xs="4">
                                                                <div className="me-2 mb-2">
                                                                    <div className="position-relative sw">
                                                                        <SearchBar
                                                                            {...toolkitProps.searchProps}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xl="12">
                                                                <div className="table-responsive">
                                                                    <BootstrapTable
                                                                        keyField={"_id"}
                                                                        responsive
                                                                        bordered={false}
                                                                        striped={false}
                                                                        defaultSorted={defaultSorted}ß
                                                                        classes={
                                                                            "table align-middle table-nowrap"
                                                                        }
                                                                        headerWrapperClasses={"thead-light"}
                                                                        {...toolkitProps.baseProps}
                                                                        {...paginationTableProps}
                                                                    />

                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="align-items-md-center mt-30">
                                                            <Col className="inner-custom-pagination d-flex">
                                                                <div className="text-md-right ms-auto">
                                                                    <PaginationListStandalone
                                                                        {...paginationProps}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </React.Fragment>
                                                )
                                                }
                                            </ToolkitProvider>
                                        )
                                        }</PaginationProvider>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <AddUser addOpen={addOpen} toggleAdd={toggleAdd} hitAxios={hitAxios}/>
            <EditUser editOpen={editOpen} toggleEdit={toggleEdit} user={selectedUser} hitAxios={hitAxios}/>
            <DeleteUser deleteOpen={deleteOpen} toggleDelete={toggleDelete} user={selectedUser} hitAxios={hitAxios}/>
        </React.Fragment>
    )
}

export default Users;
