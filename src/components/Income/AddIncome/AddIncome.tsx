import { Dialog, DialogTitle, DialogContent, Tooltip, FormControl, InputLabel, OutlinedInput, DialogActions, Button } from '@mui/material';
import { fetchCategories } from 'services/categories-service';
import { UserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react'
import { categoryIcons } from 'services/service';
import { addIncome, updateIncome } from 'services/users-service';
import React from 'react';

const AddIncome = React.memo(({ open, onClose, editIncome }: any) => {
	const { user } = UserAuth();
	const [categories, setCategories] = useState([]);

	const [formData, setFormData] = useState({
		selectedCategory: editIncome ? editIncome.category : '',
		name: editIncome ? editIncome.name : '',
		total: editIncome ? editIncome.total : ''
	});

	const [buttonClicked, setButtonClicked] = useState(false);

	const handleCategorySelect = (categoryName: string) => {
		setFormData({ ...formData, selectedCategory: categoryName });
	};

	const handleAddIncome = async () => {
		setButtonClicked(true);
		try {
			if (!formData.selectedCategory || !formData.name || !formData.total) {
				return;
			}

			const incomeData = {
				name: formData.name,
				date: new Date().toISOString(),
				total: parseFloat(formData.total),
				category: formData.selectedCategory
			};

			let response;
			if (editIncome) {
				// Update existing income
				response = await updateIncome(user.userId, user.authToken, editIncome.docId, incomeData);
			} else {
				// Add new income
				response = await addIncome(user.userId, user.authToken, incomeData);
			}

			onClose(response);
		} catch (error: any) {
			console.error('Error adding income:', error.message);
		}
	};

	useEffect(() => {
		if (!user?.authToken) {
			console.error('Authentication token not found.');
			return;
		}

		fetchCategories(user.authToken)
			.then((categoriesData: any) => {
				const incomeCategories = categoriesData.filter((category: any) => category.type === 'incomes');

				console.log(categoriesData)
				setCategories(incomeCategories);
				console.log('Income Categories:', incomeCategories);
			})
			.catch((error) => {
				console.error('Error fetching categories:', error);
			});
	}, []);

	useEffect(() => {
		if (open && editIncome) {
			setFormData({
				...formData,
				selectedCategory: editIncome.category || '',
				name: editIncome.name || '',
				total: editIncome.total || ''
			});
		} else {
			setFormData({ ...formData, selectedCategory: '', name: '', total: '' });
		}
	}, [open, editIncome]);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Add Income"}
			</DialogTitle>
			<DialogContent>
				<div className='mb-2'><b>Choose Category:</b></div>
				<div className='grid grid-cols-12 mb-3 gap-y-3'>
					{categories.map((category: any, index) => (
						<div className='col-span-1' key={index} onClick={() => handleCategorySelect(category.name)}>
							<div className='flex justify-center'>
								<div className={`category-div ${formData.selectedCategory === category.name ? 'border border-black' : ''}`}>
									<Tooltip title={category.name} arrow>
										{categoryIcons[category.name]}
									</Tooltip>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='mb-2'>
					<div className='mb-2'><b>Write a Note:</b></div>
					<FormControl sx={{ width: '100%' }} size="small" variant="outlined">
						{!formData.name && <InputLabel htmlFor="outlined-adornment-text">Text here...</InputLabel>}
						<OutlinedInput
							id="outlined-adornment-text"
							label="Text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						/>
					</FormControl>
				</div>
				<div className='mb-2'>
					<div className='mb-2'><b>Add Amount</b></div>
					<FormControl sx={{ width: '100%' }} size="small" variant="outlined">
						{!formData.total && <InputLabel htmlFor="outlined-adornment-text">$140.55</InputLabel>}
						<OutlinedInput
							id="outlined-adornment-text"
							label="Text"
							value={formData.total}
							onChange={(e) => setFormData({ ...formData, total: e.target.value })}
						/>
					</FormControl>
				</div>
				{buttonClicked && (!formData.selectedCategory || !formData.name || !formData.total) && (
					<div className='error-message'>All Fields Are Required!</div>
				)}
			</DialogContent>
			<DialogActions sx={{ padding: '24px' }}>
				<Button className='close-button' variant="contained" onClick={onClose}>Cancel</Button>
				{!editIncome ?
					<Button className='add-income-button' variant="contained" onClick={handleAddIncome} autoFocus>Add Income</Button>
					:
					<Button className='add-income-button' variant="contained" onClick={handleAddIncome} autoFocus>Edit Income</Button>}
			</DialogActions>
		</Dialog>
	)
});

export default AddIncome
