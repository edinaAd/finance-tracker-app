import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import Header from 'components/Header/Header';
import Navbar from 'components/Navbar/Navbar';
import { useEffect } from 'react'
import './Dashboard.scss';
import DashboardChart from './DashboardChart';

const Dashboard = () => {
	useEffect(() => {
		// Change body background color when the component mounts
		document.body.style.backgroundColor = '#f0f0f0';

		// Revert back to original background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, []);
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
								<span className='flex justify-center font-bold amount-color-income'>$43,300</span>
								<span className='flex justify-center'>Income</span>
							</div>
						</div>
						<div className='md:col-span-6 lg:col-span-6 col-span-12'>
							<div className='total-income'>
								<span className='flex justify-center font-bold amount-color-expense'>$43,300</span>
								<span className='flex justify-center'>Expenses</span>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-12'>
						<div className='col-span-12 flex justify-center'>
							<div className='balance'>
								<span className='flex justify-center font-bold amount-color-balance'>$43,300</span>
								<span className='flex justify-center'>Balance</span>
							</div>
						</div>
					</div>
					<div className='dashboard-chart-container'>
						<DashboardChart />
					</div>
				</Box>
			</Box>
		</div>
	)
}

export default Dashboard
