import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import {
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Charge from "./charge";
import axios from 'axios';
import AppConfig from 'constants/config';
import { useToasts } from 'react-toast-notifications';


const Payment = () => {
    const { addToast } = useToasts();
    const [addOpen, setAddOpen] = useState(false);
    const [data, setData] = useState([]);

    const pageOptions = {
        sizePerPage: 10,
        totalSize: data.length,
        custom: true,
    }

    const defaultSorted = [{
      dataField: 'id',
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
            dataField: "transNo",
            text: "Transaction No",
        },
        {
            dataField: "amount",
            text: "Amount",
        },
        {
            dataField: "paymentStatus",
            text: "Payment Status",
        }
    ]

    const { SearchBar } = Search;
    const toggleCharge = () => {
        setAddOpen(!addOpen)
    }
    useEffect(()=> {
        axios.post(`${AppConfig.baseUrl}payments/listing`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            console.log('sadkamsdasda',result)
            let newData = []
            result.data.data.map((d, i)=> newData.push({
                id: i, name: d.customer_id.name, email: d.customer_id.email, transNo: d.payment_object.id, paymentStatus: (d.type == "payment_intent.succeeded" || d.type == "charge.succeeded") ? 'Success' : 'Failed', amount: Number(d.payment_object.data.object.amount)/100
            }))
            setData(newData)
        }).catch(error => {
            addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
        });
    },[])
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Payment | Credit Mountain</title>
                </MetaTags>
                <div className="container-fluid">
                    <Breadcrumb title="Payment" breadcrumbItem="Payment" toggleCharge={toggleCharge}/>
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                        pagination={paginationFactory(pageOptions)}
                                        keyField='id'
                                        columns={columns}
                                        data={data}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                                keyField='id'
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
                                                                        keyField={"id"}
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
            <div>{ addOpen && <Charge addOpen={addOpen} toggleCharge={toggleCharge} />}</div>
        </React.Fragment>
    )
}

export default Payment;
