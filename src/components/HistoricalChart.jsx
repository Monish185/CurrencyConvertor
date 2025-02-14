import React from 'react';
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalChart = ({historicalData , from , to}) => {
    const labels = historicalData.map((e) => e.date)
    const dataPoints = historicalData.map((e) => e.rate)

    const data = {
        labels,
        datasets : [
            {
                label : `Exchange rate (${from} to ${to})`,
                data : dataPoints,
                fill : false,
                backgroundColor : 'rgba(75,192,192,0.6)',
                borderColor : 'rgba(75, 192, 192,1)',
                borderWidth : 2,
                tension : 0.1
            },
        ],
    };

    const options = {
        responsive : true,
        plugins : {
            Legend: {
                position : 'top',
            },
            title : {
                display : true,
                text : `Historical Exchange Rate (${from} to ${to})`,
            },
        },
    };
    return <Line data = {data} options = {options} />;
};

export default HistoricalChart;