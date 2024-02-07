import { Box, Button, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'
import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpensesChart from './ExpensesChart';
import './Expenses.scss';
import AddExpense from './AddExpense/AddExpense';

const Expenses = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  
	useEffect(() => {
		// Change body background color when the component mounts
		document.body.style.backgroundColor = '#f0f0f0';

		// Revert back to original background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, []);


	function createData(
		name: string,
		calories: number,
		fat: number,
		carbs: number
	) {
		return { name, calories, fat, carbs };
	}

	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24),
		createData('Ice cream sandwich', 237, 9.0, 37),
		createData('Eclair', 262, 16.0, 24),
		createData('Cupcake', 305, 3.7, 67),
		createData('Gingerbread', 356, 16.0, 49),
	];

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
						maxHeight: 200, // Adjust the max-height as needed
						overflowY: 'auto'
					}}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell><b>Expense Name</b></TableCell>
									<TableCell align="center"><b>Date</b></TableCell>
									<TableCell align="center"><b>Amount&nbsp;($)</b></TableCell>
									<TableCell align="center"><b>Category</b></TableCell>
									<TableCell sx={{ display: 'flex', justifyContent: 'center'}}><b>Action</b></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="center">{row.calories}</TableCell>
										<TableCell align="center">{row.fat}</TableCell>
										<TableCell align="center">{row.carbs}</TableCell>
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
					<ExpensesChart />

				</Box>
			</Box>
		</div>
	)
}

export default Expenses
