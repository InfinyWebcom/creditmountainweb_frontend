import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Breadcrumb from "../../components/Common/Breadcrumb";

const ComingSoon = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Coming soon | Credit Mountain</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="Coming soon" breadcrumbItem="Coming soon" />
        </Container>
      </div>
    </React.Fragment >
  )
}

export default ComingSoon;
