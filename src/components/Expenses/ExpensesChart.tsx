import React from 'react'
import Chart from "echarts-for-react";

interface Props {
    data: { value: number, name: string }[]
}

const ExpensesChart: React.FC<Props> = ({ data }) => {
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
                        top: 'middle',
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            data,
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

export default ExpensesChart
