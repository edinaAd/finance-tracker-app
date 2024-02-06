import React from 'react'
import Chart from "echarts-for-react";

const IncomeChart = () => {
    return (
        <div className='chart-container bg-white mt-4 rounded-lg pr-2'>
            <Chart
                option={{
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 'middle', // Move legend to the middle vertically
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'], // Set the radius to create a donut
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }}

            />
        </div>
    )
}

export default IncomeChart
