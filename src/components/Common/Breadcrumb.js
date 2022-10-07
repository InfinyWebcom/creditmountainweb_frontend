import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  return (
    <Row>
      <Col xs="12">
        <div className="pb-3 d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
          {
            props.title === "Users" ? 
            <button
              type="button"
              className="btn btn-cmtheme"
              onClick={props.toggleAdd}
            >
              ADD NEW
            </button> : 
            props.title === "Payment" ?
            <button
              type="button"
              className="btn btn-cmtheme"
              onClick={props.toggleCharge}
            >
              CHARGE
            </button> : ''
          }
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  toggleAdd:PropTypes.any,
  toggleCharge: PropTypes.any
}

export default Breadcrumb
