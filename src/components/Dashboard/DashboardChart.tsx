import Chart from "echarts-for-react";

const DashboardChart = ({data}: any) => {

	return (
		<Chart
			style={{ marginTop: '40px' }}

			option={{
				legend: {
					data: ['Expenses', 'Income']
				},
				tooltip: {},
				dataset: {
					source: data
				},
				xAxis: { type: 'category' },
				yAxis: {},
				series: [
					{ type: 'bar', name: 'Expenses' },
                    { type: 'bar', name: 'Income' }
				],
				// height: '250px'

			}}
		/>
	)
}

export default DashboardChart
