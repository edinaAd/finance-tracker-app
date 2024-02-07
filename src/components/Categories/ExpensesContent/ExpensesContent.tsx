import React from 'react'
import './ExpensesContent.scss';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const ExpensesContent = () => (
    <div className='bg-white mt-10 py-5 rounded-lg'>
        <div className='grid grid-cols-12'>
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div>
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div>
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div>
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div>  
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div> 
            <div className='col-span-2'>
                <div className='flex justify-center'>
                    <div className='rounded-div'>
                        <RestaurantIcon />
                    </div>
                </div>
                <div className='flex justify-center'>
                    Food
                </div>
            </div>         
        </div>
    </div>
);

export default ExpensesContent
