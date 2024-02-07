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
                <div>Choose Category:</div>
                <div className='grid grid-cols-12 mb-3'>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex justify-center'>
                            <div className='category-div'>
                                <RestaurantIcon />
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            Food
                        </div>
                    </div>
                </div>
                <div>Write a Note:</div>
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-text">Text here...</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-text"
                        label="Text"
                    />
                </FormControl>
                <div>Add Amount</div>
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-text">$140.55</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-text"
                        label="Text"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} autoFocus>
                    Add Expense
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddExpense
