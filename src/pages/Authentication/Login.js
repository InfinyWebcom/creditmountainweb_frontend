import MetaTags from "react-meta-tags";
import React from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router-dom";
import AppConfig from 'constants/config';
import axios from 'axios';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = props => {
  const history = useHistory();
  const { addToast } = useToasts();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (values) =>{
    axios.post(`${AppConfig.baseUrl}users/login`, values, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      console.log('result', result)
        if (result.data.error) {
          addToast(result.data.title, { appearance: 'error', autoDismiss: true });
        } else {
          addToast(result.data.title, { appearance: 'success', autoDismiss: true });
          setTimeout(()=>{
            localStorage.setItem('authUser', true);
            localStorage.setItem('token', result.data.token);
            history.push('/home');
          },1000)
        }
    }).catch(error => {
      addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
      });
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Credit Mountain</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5 login-mt">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className=" bg-softbg-soft-primary bg-theme-color">
                  <Row>
                    <Col xs={12}>
                      <div className="text-primary p-4">
                        <h5 className="text-white login-head">Welcome To Credit Mountain </h5>
                        <p className="text-white">Sign in to continue</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2 mt-4">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
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

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          className="btn bg-theme-color btn-block"
                          type="submit"
                        >
                          LOGIN
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
