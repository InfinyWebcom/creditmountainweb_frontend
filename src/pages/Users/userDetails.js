import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Card, CardBody, CardTitle, Col, Container, Row, Modal, FormFeedback, Label, Input, FormGroup, Form } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import AppConfig from 'constants/config';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import AddCard from './addCard';
import moment from 'moment';
import { withRouter, useLocation } from 'react-router-dom';


const UserDetails = (prop) => {
    const location = useLocation();
    const { addToast } = useToasts();
    const [addOpen, setAddOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const toggleAdd = () => {
        setAddOpen(!addOpen)
    }
    useEffect(() => { hitAxios() }, [addOpen])
    const hitAxios = () => {
        let Id = prop.match.params.id;
        axios.get(`${AppConfig.baseUrl}users/user_details?Id=${Id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.data.error) {
            } else {
                setUserData(result.data.data)
            }
        }).catch(error => {
            // addToast('Something went wrong, Please try again', { appearance: 'error' });
        });
    }
    useEffect(()=> {
        let data = {Id: prop.match.params.id}
        axios.post(`${AppConfig.baseUrl}payments/listing`, data, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            console.log('sadkamsdasda',result)
            let newData = []
            result.data.data.map((d, i)=> newData.push({
                id: i, name: d.customer_id.name, email: d.customer_id.email, transNo: d.payment_object.id,
                paymentStatus: d.type=="charge.succeeded" ? 'Success' : 'Failed', amount: Number(d.payment_object.data.object.amount)/100,
                date: moment(d.createdAt).format('DD/MM/YYYY'), paymentStatus: (d.type == "payment_intent.succeeded" || d.type == "charge.succeeded") ? 'Success' : 'Failed'
            }))
            setData(newData)
        }).catch(error => {  });
    },[])
    useEffect(() => { // for toast after redirection 
        let url = location.search;
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''
        console.log('asdoamsod',json)
        if(json && json.status == 'success'){
            addToast('Card added successfully', { appearance: 'success', autoDismiss: true });
        } else if (json && json.status == 'failed') {
            addToast(`Could'nt add Card`, { appearance: 'error', autoDismiss: true });
        }
    },[])
    
    const paymentColumns = [
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
            text: "Status",
        },
        {
            dataField: "date",
            text: "Date",
        },
    ]

    const handleSubmit = () => {
        let data = prop.match.params.id;
        let stripe_id = userData.stripe_cust_id;
        axios.get(`${AppConfig.baseUrl}stripe/addNewCard?customer_id=${stripe_id}&Id=${data}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            console.log('sadkamsd',result)
            window.location.assign(result.data)
        }).catch(error => {
            addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
        });
    }

    const AddBraintreeCard = () => {
        console.log("AddBraintreeCard");
    }
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>User Details | Credit Mountain</title>
                </MetaTags>
                <Row>
                    <Col xs="12">
                        <div className="pb-2 d-sm-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-cmtheme"
                                onClick={handleSubmit}
                                >
                                ADD CARD TO STRIPE
                            </button>

                            <button
                                type="button"
                                className="btn btn-cmtheme"
                                onClick={()=>setAddOpen(!addOpen)}
                                >
                                ADD CARD TO BRAINTREE
                            </button>
                        </div>
                        
                    </Col>
                </Row>
                <Container fluid>
                    <Row>
                        <Col xl="4" lg="4" md="4" xxl="4">
                            <Row>
                                <Card className="overflow-hidden">
                                    <CardBody>
                                        <CardTitle className="mb-4">OVERVIEW</CardTitle>
                                        {/* <Button>Add Card</Button> */}
                                        <Row className="mb-3">
                                            <Col xl="5" lg="5" xxl="5">
                                                <h6>
                                                    Name:
                                            </h6>
                                            </Col>
                                            <Col xl="7" lg="7" xxl="7">
                                                {userData && userData.name}
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className="mb-3">
                                            <Col xl="5" lg="5" xxl="5">
                                                <h6>
                                                    Email:
                                            </h6>
                                            </Col>
                                            <Col xl="7" lg="7" xxl="7">
                                                {userData && userData.email}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                { userData && userData.card &&
                                <Card style={{padding: '0px'}}>
                                    {/* <CardBody> */}
                                        <div className="card text-white visa-card mb-0" style={{backgroundColor:'#03ADEF'}}>

                                            <CardBody>
                                                <div>
                                                    <i className="bx bxl-visa visa-pattern" />

                                                    <div className="float-end">
                                                        <i className="bx bxl-visa visa-logo display-3" />
                                                    </div>

                                                    <div>
                                                        <i className="bx bx-chip h1 text-warning" />
                                                    </div>
                                                </div>

                                                <Row className="mt-5">
                                                    <Col xs="4">
                                                        <p>
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                        </p>
                                                    </Col>
                                                    <Col xs="4">
                                                        <p>
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                            <i className="fas fa-star-of-life m-1" />
                                                        </p>
                                                    </Col>
                                                    <Col xs="4">
                                                        <p>
                                                            <i className="text-white m-1" style={{fontSize:'16px'}}>{userData && userData.card.last4 && userData.card.last4[0]}</i>
                                                            <i className="text-white m-1" style={{fontSize:'16px'}}>{userData && userData.card.last4 && userData.card.last4[1]}</i>
                                                            <i className="text-white m-1" style={{fontSize:'16px'}}>{userData && userData.card.last4 && userData.card.last4[2]}</i>
                                                            <i className="text-white m-1" style={{fontSize:'16px'}}>{userData && userData.card.last4 && userData.card.last4[3]}</i>
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <div className="mt-5">
                                                    <h5 className="text-white float-end mb-0">{userData && userData.card.exp_month} / {userData && userData.card.exp_year}</h5>
                                                    {/* <h5 className="text-white mb-0">{userData && (userData.card.name).toUpperCase()}</h5> */}
                                                </div>
                                            </CardBody>
                                        </div>
                                    {/* </CardBody> */}
                                </Card>}
                            </Row>
                        </Col>

                        <Col xl="8" lg="8" md="8" xxl="8"><Card>
                                <CardBody>
                                    <CardTitle className="mb-4">PAYMENTS
                                    </CardTitle>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={data}
                                        columns={paymentColumns}
                                        bootstrap4
                                    >
                                        {toolkitProps => (
                                            <React.Fragment>
                                                <Row>
                                                    <Col xl="12">
                                                        <div className="table-responsive">
                                                            <BootstrapTable
                                                                responsive
                                                                remote
                                                                columns={paymentColumns}
                                                                bordered={false}
                                                                striped={false}
                                                                classes={
                                                                    "table align-middle table-nowrap table-hover"
                                                                }
                                                                headerWrapperClasses={"table-light"}
                                                                {...toolkitProps.baseProps}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )}
                                    </ToolkitProvider>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <AddCard addOpen={addOpen} toggleAdd={toggleAdd} Id={prop.match.params.id} />            
        </React.Fragment>
    )
}


export default withRouter(UserDetails);