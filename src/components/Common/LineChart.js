import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const LineChart = (prop) => {
    const { labels, data, height } = prop;

    const options = {
        chart: {
            toolbar: "false",
            dropShadow: {
                enabled: !0,
                color: "#000",
                top: 18,
                left: 7,
                blur: 8,
                opacity: 0.2,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#03ADEF"],
        stroke: {
            curve: "smooth",
            width: 3,
        },
        xaxis: {
          categories: labels,
        }
    };

    const series = [
        {
            name: "Revenue",
            data: data,
        },
    ];

    return (
        <React.Fragment>
            <div id="line-chart" dir="ltr">
                <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={height ? height : 320}
                    className="apex-charts"
                />
            </div>
        </React.Fragment>
    );
}

export default LineChart;
