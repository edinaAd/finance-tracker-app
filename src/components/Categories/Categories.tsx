import { Box, CssBaseline, Tab, Tabs, Toolbar } from '@mui/material'
import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import { useEffect } from 'react'
import './Categories.scss';
import React from 'react';
import ExpensesContent from './ExpensesContent/ExpensesContent';
import IncomesContent from './IncomesContent/IncomesContent';


const Categories = () => {

	const [value, setValue] = React.useState(0);

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

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
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="styled tabs example"
						className='categories-tabs'
					>
						<Tab disableRipple label="Expenses" />
						<Tab disableRipple label="Income" />
					</Tabs>
					{value === 0 && <ExpensesContent />}
					{value === 1 && <IncomesContent />}
				</Box>

			</Box>

		</div>
	)
}

export default Categories
