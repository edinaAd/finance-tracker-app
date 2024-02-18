import { useEffect, useState } from 'react'
import './ExpensesContent.scss';
import { fetchCategories } from 'services/categories-service';
import { categoryIcons } from 'services/service';
import { UserAuth } from 'context/AuthContext';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';


const ExpensesContent = () => {
    const { user } = UserAuth();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!user?.authToken) {
            console.error('Authentication token not found.');
            return;
        }
        setLoading(true);

        fetchCategories(user.authToken)
            .then((categoriesData: any) => {
                const expenseCategories = categoriesData.filter((category: any) => category.type === 'expenses');
                setCategories(expenseCategories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <>
            {loading ? (
                <div className='flex justify-center loader'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='bg-white mt-10 py-5 rounded-lg'>

                    <div className='grid grid-cols-12 gap-y-5'>
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
            )}
        </>
    )

}

export default ExpensesContent
