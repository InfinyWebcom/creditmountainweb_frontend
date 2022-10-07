import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Label, Input, Form, FormFeedback } from "reactstrap";
import { useToasts } from 'react-toast-notifications';
import * as Yup from "yup";
import { useFormik } from "formik";
import AppConfig from 'constants/config';
import axios from 'axios';

const AddUser = (prop) => {
    const { addOpen, toggleAdd, hitAxios } = prop;
    const { addToast } = useToasts();
    const validation = useFormik({
        enableReinitialize: true,
    
        initialValues: {
          email: '',
          name: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().required("Please Enter Your Email"),
          name: Yup.string().required("Please Enter Your Name"),
        }),
        onSubmit: (values) => {
          handleSubmit(values);
        }
    });
    const handleSubmit = (values) =>{
        axios.post(`${AppConfig.baseUrl}users/addUser`, values, {
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          }
        }).then(result => {
          console.log('result', result,result.data.title)
            if (result.data.error) {
              addToast(result.data.title, { appearance: 'error', autoDismiss: true });
            } else {
              hitAxios();
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
            size="md"
            centered
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">Add User</h5>
                <button
                    type="button"
                    onClick={toggleAdd}
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
                    <Row>
                        <Col xs="12">
                            <div className="mt-3">
                                <Label for="name" className="col-form-label">
                                    Name:
                                </Label>
                                <Input
                                     name="name"
                                     className="form-control"
                                     placeholder="Enter name"
                                     type="name"
                                     onChange={validation.handleChange}
                                     onBlur={validation.handleBlur}
                                     value={validation.values.name || ""}
                                     invalid={
                                         validation.touched.name && validation.errors.name ? true : false
                                     }
                                />
                                {validation.touched.name && validation.errors.name ? (
                                <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className="mt-3">
                                <Label for="email1" className="col-form-label">
                                    Email:
                                </Label>
                                <Input
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                        validation.touched.email && validation.errors.email ? true : false
                                    }
                                    />
                                    {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                    ) : null}
                            </div>
                        </Col>
                    </Row>
                    <div className="modal-footer mt-3">
                        <button type="submit" className="btn btn-cmtheme">
                            SUBMIT
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default AddUser