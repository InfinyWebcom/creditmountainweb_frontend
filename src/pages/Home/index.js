import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container, Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Table,
} from "reactstrap"
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumb from "../../components/Common/Breadcrumb";
import LineChart from "../../components/Common/LineChart";

const Dashboard = () => {

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data= [65, 59, 81, 45, 56, 80, 50, 20, 0, 12, 34, 54]
  const tableData = [
    {name: 'Mark twick' , amount: '$200', transNo: '16'},
    {name: 'Jacob Born' , amount: '$100', transNo: '12'},
    {name: 'Larry wheels' , amount: '$250', transNo: '11'},
    {name: 'Jacob Born' , amount: '$20', transNo: '9'},
    {name: 'Jason Barry' , amount: '$20', transNo: '6'}
  ]
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Home | Credit Mountain</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="Home" breadcrumbItem="Home" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <CardTitle className="card-title mb-4">PAYMENTS</CardTitle>
                    <div className="ms-auto">
                      <select className="arrow-dropdown">
                        <i className="mdi mdi-chevron-down" />
                        <option>Monthly</option>
                        <option>Annually</option>
                      </select>
                    </div>
                  </div>
                  <Row>
                    <Col md="4" lg="4" xl="4" xxl="4">
                    <div className="table-responsive">
                      <Table className="align-middle mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, i) =>
                              <tr key={i+data.amount}>
                                <td>{i+1}</td>
                                <td>{data.name}</td>
                                <td>{data.amount}</td>
                              </tr>
                            )}
                        </tbody>
                      </Table>
                    </div>
                    </Col>
                    <Col md="8" lg="8" xl="8" xxl="8">
                      <LineChart labels={labels} data={data} height={260} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <CardTitle className="card-title mb-4">USERS</CardTitle>
                  </div>
                  <div className="table-responsive">
                      <Table className="align-middle mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>No of transactions</th>
                          </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, i) =>
                              <tr key={i+data.amount}>
                                <th>{i+1}</th>
                                <td>{data.name}</td>
                                <td>{data.amount}</td>
                                <td>{data.transNo}</td>
                              </tr>
                            )}
                        </tbody>
                      </Table>
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  )
}

export default Dashboard;
