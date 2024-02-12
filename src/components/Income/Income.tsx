import { Box, Button, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'
import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Income.scss';
import IncomeChart from './IncomeChart';
import { fetchIncomes } from 'api/api-users';
import { UserAuth } from 'context/AuthContext';

const Income = () => {
	console.log("INCOME");
    const { user } = UserAuth();

	// console.log(user?.authToken, user.userId)

	const [incomes, setIncomes] = useState<any[]>([]);
	const [chartData, setChartData] = useState<{name: string, value: number}[]>([]);

    useEffect(() => {
        const fetchUserIncomes = async () => {
			try {
				
				let incomesData = await fetchIncomes(user?.userId, user?.authToken);
				console.log(incomesData)
				let chartObj: any = {};
				incomesData = incomesData.documents.map((document: any) => {
					const income = document.fields;
					const category = income.category.stringValue;
					const total = parseFloat(income.total.integerValue);

					if (chartObj[category]) chartObj[category] += total
					else chartObj[category] = total;
					return {
					docId: document.name.split("/").pop(),
					name: income?.name?.stringValue,
					date: income?.date?.timestampValue,
					total,
					category: income?.category?.stringValue
					};
				})

				setIncomes(incomesData);
				setChartData(Object.entries(chartObj).map(([key, value]) => {
					return {
						name: key,
						value
					} as { name: string, value: number}
				}));
			} catch (error: any) {
				console.log(error);
				console.error('Error fetching incomes:', error.message);
			}
		};
	

        fetchUserIncomes();
    }, [user?.userId, user?.authToken]);

	useEffect(() => {
		// Change body background color when the component mounts
		document.body.style.backgroundColor = '#f0f0f0';

		// Revert back to original background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, []);

	console.log(incomes)


	return (
		<div>
			<Box sx={{ display: 'flex', margin: '30px' }}>
				<CssBaseline />
				<Header />
				<Navbar />
				<Box component="main" sx={{ flexGrow: 1, padding: '0px 24px', overflowY: 'auto' }}>
					<Toolbar />
					<div className='income-button flex justify-end mb-4'>
						<Button variant="contained">Add New</Button>
					</div>
					<TableContainer component={Paper} sx={{
						maxHeight: 200, 
						overflowY: 'auto'
					}}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell><b>Income Name</b></TableCell>
									<TableCell align="center"><b>Date</b></TableCell>
									<TableCell align="center"><b>Total&nbsp;($)</b></TableCell>
									<TableCell align="center"><b>Category</b></TableCell>
									<TableCell sx={{ display: 'flex', justifyContent: 'center'}}><b>Action</b></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{incomes.map((income) => (
									<TableRow
										key={income.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="income">
											{income.name}
										</TableCell>
										<TableCell align="center">{income.date.split("T")[0]}</TableCell>
										<TableCell align="center">{income.total}</TableCell>
										<TableCell align="center">{income.category}</TableCell>
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
					{ chartData.length > 0 && <IncomeChart data={chartData}/> }
                  
				</Box>
			</Box>
		</div>
	)
}

export default Income
