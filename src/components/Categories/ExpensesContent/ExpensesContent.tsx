import React, { useEffect, useState } from 'react'
import './ExpensesContent.scss';
import { fetchCategories } from 'api/api-categories';
import { Icon } from '@mui/material'; 
import { categoryIcons } from 'services/service';


const ExpensesContent = () => {
    const [categories, setCategories] = useState([]);

   
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('Authentication token not found.');
            return;
        }

        fetchCategories(authToken)
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

    console.log(categories)
    return (
        <div className='bg-white mt-10 py-5 rounded-lg'>
            <div className='grid grid-cols-12'>
                {categories.map((category: any, index) => (
                    <div className='col-span-2' key={index}>
                        <div className='flex justify-center'>
                            <div className='rounded-div'>
                            {categoryIcons[category.name]}
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ExpensesContent
