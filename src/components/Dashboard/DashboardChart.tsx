import Chart from "echarts-for-react";

import React, { useEffect } from 'react'

const DashboardChart = () => {

    return (
        <Chart
        style={{ marginTop: '40px' }} 

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
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
              { type: 'bar' }, 
              { type: 'bar' }  
            ],
            // height: '250px'

          }}
        />
    )
}

export default DashboardChart
