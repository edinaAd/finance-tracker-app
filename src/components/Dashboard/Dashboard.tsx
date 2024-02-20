import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from 'components/Header/Header';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Navbar from 'components/Navbar/Navbar';
import { UserAuth } from 'context/AuthContext';
import { memo } from 'react';
import { useEffect, useState } from 'react'
import { fetchExpenses, fetchIncomes } from 'services/users-service';
import './Dashboard.scss';
import DashboardChart from './DashboardChart';
interface ExpenseData {
	[date: string]: number;
}

const Dashboard = () => {
	const { user } = UserAuth() ?? {};

	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [chartData, setChartData] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	const balance = totalIncome - totalExpenses;

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch expenses data
				setLoading(true);
				const expensesData = await fetchExpenses(user?.userId, user?.authToken);
				let totalExpenses = 0;
				const expensesByDate: ExpenseData = {};

				expensesData?.documents?.forEach((document: any) => {
					const expense = document.fields;
					const date = new Date(expense.date.timestampValue).toLocaleDateString();
					totalExpenses += parseFloat(expense.total.integerValue);

					if (expensesByDate[date]) {
						expensesByDate[date] += parseFloat(expense.total.integerValue);
					} else {
						expensesByDate[date] = parseFloat(expense.total.integerValue);
					}
				});

				// Fetch incomes data
				const incomesData = await fetchIncomes(user?.userId, user?.authToken);
				let totalIncome = 0;
				const incomeByDate: ExpenseData = {};

				incomesData?.documents?.forEach((document: any) => {
					const income = document.fields;
					const date = new Date(income.date.timestampValue).toLocaleDateString();

					totalIncome += parseFloat(income.total.integerValue);

					if (incomeByDate[date]) {
						incomeByDate[date] += parseFloat(income.total.integerValue);
					} else {
						incomeByDate[date] = parseFloat(income.total.integerValue);
					}
				});
				const dates = Object.keys({ ...expensesByDate, ...incomeByDate }).sort();
				const chartData = dates.map(date => [date, expensesByDate[date] || 0, incomeByDate[date] || 0]);

				setChartData(chartData);
				setTotalExpenses(totalExpenses);
				setTotalIncome(totalIncome);
				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				console.error('Error fetching data:', error.message);
			}
		};

		fetchData();

		// Change body background color when the component mounts
		document.body.style.backgroundColor = '#f0f0f0';

		// Revert back to original background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, [user?.userId, user?.authToken]);


	return (
		<div>
			<Box sx={{ display: 'flex', margin: '30px' }}>
				<CssBaseline />
				<Header />
				<Navbar />
				<Box component="main" sx={{ flexGrow: 1, padding: '0px 24px', overflowY: 'auto' }}>
					<Toolbar />
					<div className='grid grid-cols-12 gap-7'>
						<div className='md:col-span-6 lg:col-span-6 col-span-12'>
							<div className='total-income'>
								<span className='flex justify-center font-bold amount-color-income'>+ ${totalIncome}</span>
								<span className='flex justify-center'>Income</span>
							</div>
						</div>
						<div className='md:col-span-6 lg:col-span-6 col-span-12'>
							<div className='total-income'>
								<span className='flex justify-center font-bold amount-color-expense'>- ${totalExpenses}</span>
								<span className='flex justify-center'>Expenses</span>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-12'>
						<div className='col-span-12 flex justify-center'>
							<div className='balance'>
								<span className='flex justify-center font-bold amount-color-balance'>${balance}</span>
								<span className='flex justify-center'>Balance</span>
							</div>
						</div>
					</div>
					{loading ? (
						// Show loader while data is being fetched
						<div className="loader">
							<LoadingSpinner />
						</div>
					) : (
						// Show chart or no data message based on chartData length
						<div className='dashboard-chart-container'>

							{chartData.length > 0 ? (
								<DashboardChart data={chartData} />
							) : (
								<div className="no-data-message">
									<p className='flex justify-center font-bold italic'>No expense or income data found!</p>
								</div>
							)}
						</div>

					)}
				</Box>
			</Box>
		</div>
	)
}

export default memo(Dashboard);
