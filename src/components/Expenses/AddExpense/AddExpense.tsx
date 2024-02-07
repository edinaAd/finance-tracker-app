import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import './AddExpense.scss';

const AddExpense = ({ open, onClose }: any) => {
    console.log(open)
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
                <div className='grid grid-cols-12 mb-3'>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'red'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'blue'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'yellow'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'pink'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'green'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'purple'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon sx={{fill: 'lightblue'}} />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='mb-2'><b>Write a Note:</b></div>
                    <FormControl sx={{ width: '100%' }} size="small" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-text">Text here...</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-text"
                            label="Text"
                        />
                    </FormControl>
                </div>
                <div className='mb-2'>
                    <div className='mb-2'><b>Add Amount</b></div>
                    <FormControl sx={{ width: '100%' }} size="small" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-text">$140.55</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-text"
                            label="Text"
                        />
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions sx={{padding: '24px'}}>
                <Button className='close-button' variant="contained" onClick={onClose}>Cancel</Button>
                <Button className='add-expense-button' variant="contained" onClick={onClose} autoFocus>Add Expense</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddExpense
