import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row, Modal, FormFeedback, Label, Input, FormGroup, Form } from "reactstrap"
import AppConfig from 'constants/config';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import * as Yup from "yup";
import { useFormik } from "formik";
import AddCard from '../Users/addCard';
import Checkout from "./checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51KWzK2SDnBZpxPUEkLTsXNZ2ofaN34r4NENSiWD5VZogmckrOx54u0i8ZrhZgqRa7V71jqi9Ybj7wJxuERnLGXvk00pNlIDTV9');

const Charge = (prop) => {
    let { addOpen, toggleCharge } = prop;
    const [addCard, setAddOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [parentData, setParentData] = useState({});
    const [userId, setUserId] = useState('');
    const { addToast } = useToasts();
    const toggleAdd = () => {
        setAddOpen(!addCard)
    }
    useEffect(() => { hitAxios() }, [addCard])
    const hitAxios = () => {
        axios.get(`${AppConfig.baseUrl}users/getUsers`, {
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.data.error === false) {
                setUsersData(result.data.data)
            }
        })
    }
    const validation = useFormik({
        enableReinitialize: false,
        initialValues: {
            Id: '',
            amount: '',
            gateway:'stripe'
        },
        validationSchema: Yup.object({
            Id: Yup.string().required("Please Enter Name"),
            amount: Yup.number().required("Please Enter Amount")
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });
    const handleSubmit = (values) => {
        let cus = usersData.filter(e => e._id == values.Id);

        setUserId(values.Id)
        // let data = { ...values, customer: cus[0].stripe_cust_id, payment_method: cus[0].stripe_payment_id ? cus[0].stripe_payment_id : ''}
        console.log('asdoamsldkmasd',cus, cus.length > 0 , cus[0].stripe_cust_id , cus[0].stripe_payment_id)
        if(values.gateway == 'stripe'){
            if (cus.length > 0 && cus[0].stripe_cust_id && cus[0].stripe_payment_id ) {
            let data = {  payment_method: cus[0].stripe_payment_id, customer: cus[0].stripe_cust_id, amount: Number(values.amount), Id: cus[0]._id  }
            
                axios.post(`${AppConfig.baseUrl}stripe/pay`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                }).then(async result => {
                    const data = result.data.clientSecret;
                    if (result.data.data.status == 'requires_action' && result.data.data.next_action.type == 'use_stripe_sdk') {
                        window.open(result.data.data.next_action.use_stripe_sdk.stripe_js, '_blank');
                        // window.location.assign(result.data.data.next_action.use_stripe_sdk.stripe_js)
                    }
                });
            } else {
                hitAddCard(cus[0].stripe_cust_id, cus[0]._id)
            }
        }
        else{
            
            if(cus[0].braintree_cust_id != undefined || cus[0].braintree_cust_id != null){
                let data = { customerId :cus[0].braintree_cust_id, amount : values.amount}
                axios.post(`${AppConfig.baseUrl}braintree/pay`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                }).then(async result => {
                    addToast("Payment done successfully!", { appearance: 'success', autoDismiss: true });
                }); 
            }
            else{
                addToast("Add card to braintree", { appearance: 'error', autoDismiss: true });
            }
            
        }
    }
    const hitAddCard = (data, Id) => {
        axios.get(`${AppConfig.baseUrl}stripe/addNewCard?customer_id=${data}&Id=${Id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(result => {
            console.log('sadkamsd',result)
            window.location.assign(result.data)
        }).catch(error => {
            // addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
        });
    }
    console.log('sdfomsdfl',addCard)
    return (<>
        <Modal
        id='addOpen'
            isOpen={addOpen}
            toggle={() => {
                toggleCharge();
            }}
            size="md"
            centered
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">Charge User</h5>
                <button
                    type="button"
                    onClick={()=>{toggleCharge()}}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                <FormGroup className="mb-0">
                    <label className="col-form-label">Select User</label>
                      <Input
                        type="select"
                        className="form-control"
                        id="Id"
                        placeholder="Enter name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.Id || ""}
                        invalid={
                            validation.touched.Id && validation.errors.Id ? true : false
                        }>
                            <option defaultValue={validation.values.Id}>Select user</option>
                            { usersData && usersData.map((d,i) => <option value={d._id} key={d.name+i}>{d.name && (d.name).toUpperCase()}</option>)}
                        </Input>
                    {validation.touched.Id && validation.errors.Id ? (
                        <FormFeedback type="invalid">{validation.errors.Id}</FormFeedback>
                    ) : null}
                </FormGroup>
                <FormGroup className="mb-0">
                    <Label htmlFor="amountInput">
                        Amount
                    </Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="amount"
                        placeholder="Enter Amount"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.amount || ""}
                        invalid={
                            validation.touched.amount && validation.errors.amount ? true : false
                        }
                    />
                    {validation.touched.amount && validation.errors.amount ? (
                        <FormFeedback type="invalid">{validation.errors.amount}</FormFeedback>
                    ) : null}
                </FormGroup>
                <FormGroup className="mb-0">
                    <Label htmlFor="amountInput">
                        Payment Gateway
                    </Label>
                    <Input
                        type="select"
                        className="form-control"
                        id="gateway"
                        placeholder="Select payment gateway"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.gateway || ""}
                        >
                        <option value="stripe" key="pay_stripe">Stripe</option>
                        <option value="braintree" key="pay_brain">Braintree</option>
                    </Input>
                </FormGroup>
                <div className="modal-footer mt-3">
                        <button className="btn btn-cmtheme" type='submit'>
                            SUBMIT
                        </button>
                    </div>
                </Form>
                
            </div>
            {/* <AddCard addOpen={addCard} toggleAdd={toggleAdd} Id={userId} /> */}
        </Modal>
        <Modal
            id='addCard'
            isOpen={addCard}
            toggle={() => {
                toggleAdd();
            }}
            size="lg"
            centered
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">Add Card</h5>
                <button
                    type="button"
                    onClick={() => { toggleAdd() }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <Elements stripe={stripePromise} ><Checkout toggleAdd={toggleAdd} Id={userId} parentData={parentData} /></Elements>
            </div>
    </Modal>
     </>
    )
}
export default Charge;