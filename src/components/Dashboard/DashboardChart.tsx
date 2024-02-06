import Chart from "echarts-for-react";

import React, { useEffect } from 'react'

const DashboardChart = () => {

    return (
        <Chart
        style={{ marginTop: '40px' }} // Set the height here

        option={{
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['category', 'Expenses', 'Income'],
                ['Jan', 1000, 2000],
                ['Feb', 1500, 2200],
                ['Mar', 1200, 2500],
                ['Apr', 1800, 2300],
                // Add more data rows as needed...
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
              { type: 'bar' }, // Expenses series
              { type: 'bar' }  // Income series
            ],
            // height: '250px'

          }}
        />
    )
}

export default DashboardChart
