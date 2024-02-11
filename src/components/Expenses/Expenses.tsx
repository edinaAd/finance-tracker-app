import { Box, Button, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'
import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpensesChart from './ExpensesChart';
import './Expenses.scss';
import AddExpense from './AddExpense/AddExpense';
import { UserAuth } from 'context/AuthContext';
import { fetchExpenses } from 'api/api-users';

const Expenses = () => {

	const { user } = UserAuth();

	const [open, setOpen] = useState(false);
	const [expenses, setExpenses] = useState<any[]>([]);
	const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchUserExpenses = async () => {
			try {

				let expensesData = await fetchExpenses(user?.userId, user?.authToken);
				console.log(expensesData)
				let chartObj: any = {};
				expensesData = expensesData.documents.map((document: any) => {
					const expense = document.fields;
					const category = expense.category.stringValue;
					const total = expense.total.integerValue;

					if (chartObj[category]) chartObj[category] += total
					else chartObj[category] = total;
					return {
						docId: document.name.split("/").pop(),
						name: expense?.name?.stringValue,
						date: expense?.date?.timestampValue,
						total,
						category: expense?.category?.stringValue
					};
				})

				setExpenses(expensesData);
				setChartData(Object.entries(chartObj).map(([key, value]) => {
					return {
						name: key,
						value
					} as { name: string, value: number }
				}));
			} catch (error: any) {
				console.log(error);
				console.error('Error fetching incomes:', error.message);
			}
		};

		fetchUserExpenses();
	}, [user?.userId, user?.authToken]);


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
					<div className='expenses-button flex justify-end mb-4'>
						<Button variant="contained" onClick={handleClickOpen}>Add New</Button>
						<AddExpense open={open} onClose={handleClose} />

					</div>
					<TableContainer component={Paper} sx={{
						maxHeight: 200,
						overflowY: 'auto'
					}}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell><b>Expense Name</b></TableCell>
									<TableCell align="center"><b>Date</b></TableCell>
									<TableCell align="center"><b>Amount&nbsp;($)</b></TableCell>
									<TableCell align="center"><b>Category</b></TableCell>
									<TableCell sx={{ display: 'flex', justifyContent: 'center' }}><b>Action</b></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{expenses.map((expense) => (
									<TableRow
										key={expense.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{expense.name}
										</TableCell>
										<TableCell align="center">{expense.date.split("T")[0]}</TableCell>
										<TableCell align="center">{expense.total}</TableCell>
										<TableCell align="center">{expense.category}</TableCell>
										<TableCell align="center">
											<IconButton aria-label="edit">
												<EditIcon />
											</IconButton>
											<IconButton aria-label="delete">
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{ chartData.length > 0 && <ExpensesChart data={chartData} />}

				</Box>
			</Box>
		</div>
	)
}

export default Expenses
