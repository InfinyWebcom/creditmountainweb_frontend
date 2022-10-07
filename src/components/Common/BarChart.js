import React from "react"
import { Bar } from "react-chartjs-2"

const BarChart = (prop) => {
    const { labels, datasets, width, height } = prop;
    const data = {
        labels: labels,
        datasets: datasets,
    }

    const option = {
        scales: {
            xAxes: [
                {
                    barPercentage: 0.4,
                },
            ],
        },
    }

    return <Bar width={width ? width : 474} height={height ? height : 300} data={data} options={option} />
}

export default BarChart
