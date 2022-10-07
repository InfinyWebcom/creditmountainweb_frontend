import React from "react"
import { Card, CardBody, CardTitle, Col, Container, Row, Modal, FormFeedback, Label, Input, FormGroup, Form } from "reactstrap"
import AppConfig from 'constants/config';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import * as Yup from "yup";
import { useFormik } from "formik";


const AddCard = (prop) => {
    let { addOpen, toggleAdd } = prop;
    const { addToast } = useToasts();
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            cardname: '',
            cardnumber: '',
            expirydate: '',
            cvvcode: ''
        },
        validationSchema: Yup.object({
            cardname: Yup.string().required("Please Enter name "),
            cardnumber: Yup.number().min(16).required("Please Enter Card Number"),
            expirydate: Yup.string().required("Please Enter Exp date"),
            cvvcode: Yup.number().required("Please Enter Cvv Number")
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });
    const handleSubmit = (values) => {
        let data = { ...values, customerId: prop.Id }
        axios.post(`${AppConfig.baseUrl}braintree/addCard`, data, {
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          }
        }).then(result => {
          console.log('result', result,result.data.title)
            if (result.data.error) {
              addToast(result.data.title, { appearance: 'error', autoDismiss: true });
            } else {
              validation.resetForm();
              addToast(result.data.title, { appearance: 'success', autoDismiss: true });
            }
            toggleAdd()
        }).catch(error => {
          addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
        });
    }
    return (
        <Modal
            isOpen={addOpen}
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
                    onClick={()=>{toggleAdd()}}
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
                        <Label htmlFor="cardnumberInput">
                            Card Number
                            </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cardnumber"
                            placeholder="0000 0000 0000 0000"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.cardnumber || ""}
                            invalid={
                                validation.touched.cardnumber && validation.errors.cardnumber ? true : false
                            }
                        />
                        {validation.touched.cardnumber && validation.errors.cardnumber ? (
                            <FormFeedback type="invalid">{validation.errors.cardnumber}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <Row>
                        <Col lg="6">
                            <FormGroup className="mt-4 mb-0">
                                <Label htmlFor="cardnameInput">
                                    Name on card
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="cardname"
                                    placeholder="Name on Card"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cardname || ""}
                                    invalid={
                                        validation.touched.cardname && validation.errors.cardname ? true : false
                                    }
                                />
                                {validation.touched.cardname && validation.errors.cardname ? (
                                    <FormFeedback type="invalid">{validation.errors.cardname}</FormFeedback>
                                ) : null}
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className=" mt-4 mb-0">
                                <Label htmlFor="expirydateInput">
                                    Expiry date
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="expirydate"
                                    placeholder="MM/YYYY"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.expirydate || ""}
                                    invalid={
                                        validation.touched.expirydate && validation.errors.expirydate ? true : false
                                    }
                                />
                                {validation.touched.expirydate && validation.errors.expirydate ? (
                                    <FormFeedback type="invalid">{validation.errors.expirydate}</FormFeedback>
                                ) : null}
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mt-4 mb-0">
                                <Label htmlFor="cvvcodeInput">
                                    CVV Code
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="cvvcode"
                                    placeholder="Enter CVV Code"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cvvcode || ""}
                                    invalid={
                                        validation.touched.cvvcode && validation.errors.cvvcode ? true : false
                                    }
                                />
                                {validation.touched.cvvcode && validation.errors.cvvcode ? (
                                    <FormFeedback type="invalid">{validation.errors.cvvcode}</FormFeedback>
                                ) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="modal-footer mt-3">
                        <button className="btn btn-cmtheme" type='submit'>
                            SUBMIT
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default AddCard;