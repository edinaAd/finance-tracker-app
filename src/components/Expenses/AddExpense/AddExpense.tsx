import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, OutlinedInput, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './AddExpense.scss';
import { fetchCategories } from 'services/categories-service';
import { UserAuth } from 'context/AuthContext';
import { categoryIcons } from 'services/service';
import { addExpense, updateExpense } from 'services/users-service';

const AddExpense = React.memo(({ open, onClose, editExpense }: any) => {
    const { user } = UserAuth();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        selectedCategory: editExpense ? editExpense.category : '',
        name: editExpense ? editExpense.name : '',
        total: editExpense ? editExpense.total : ''
    });

    const [buttonClicked, setButtonClicked] = useState(false);

    const handleCategorySelect = (categoryName: string) => {
        setFormData({ ...formData, selectedCategory: categoryName });
    };

    const handleAddExpense = async () => {
        setButtonClicked(true);
        try {
            if (!formData.selectedCategory || !formData.name || !formData.total) {
                return;
            }

            const expenseData = {
                name: formData.name,
                date: new Date().toISOString(),
                total: parseFloat(formData.total),
                category: formData.selectedCategory
            };

            let response;
            if (editExpense) {
                // Update existing expense
                response = await updateExpense(user.userId, user.authToken, editExpense.docId, expenseData);
            } else {
                // Add new expense
                response = await addExpense(user.userId, user.authToken, expenseData);
            }
            setButtonClicked(false)
            onClose(response);
        } catch (error: any) {
            console.error('Error adding expense:', error.message);
        }
    };

    useEffect(() => {
        if (!user?.authToken) {
            console.error('Authentication token not found.');
            return;
        }

        fetchCategories(user.authToken)
            .then((categoriesData: any) => {
                const expenseCategories = categoriesData.filter((category: any) => category.type === 'expenses');

                console.log(categoriesData)
                setCategories(expenseCategories);
                console.log('Expense Categories:', expenseCategories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        if (open && editExpense) {
            setFormData({
                ...formData,
                selectedCategory: editExpense.category || '',
                name: editExpense.name || '',
                total: editExpense.total || ''
            });
        } else {
            setFormData({ ...formData, selectedCategory: '', name: '', total: '' });
        }
    }, [open, editExpense]);

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
                {"Add Expense"}
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
                {!editExpense ?
                    <Button className='add-expense-button' variant="contained" onClick={handleAddExpense} autoFocus>Add Expense</Button>
                    :
                    <Button className='add-expense-button' variant="contained" onClick={handleAddExpense} autoFocus>Edit Expense</Button>}
            </DialogActions>
        </Dialog>
    )
})

export default AddExpense
