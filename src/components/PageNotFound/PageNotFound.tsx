import React from 'react';
import { useNavigate } from 'react-router';
import './PageNotFound.scss';

function PageNotFound() {

    const navigate = useNavigate();

    const goBackToHomePage = () => {
        navigate('/')
    }

    return (
        <div className='wrapper'>
            <div className='grid grid-cols-12'>
                <div className='lg:col-span-6 md:col-span-6 col-span-12 flex items-center'>
                    <div>
                        <h1 className="title">Something is not right...</h1>
                        <p className="text">
                            Page you are trying to open does not exist. You may have mistyped the address, or the
                            page has been moved to another URL. If you think this is an error contact support.
                        </p>
                        <button className="button" onClick={goBackToHomePage}>Get back to home page</button>
                    </div>
                </div>
                <div className='lg:col-span-6 md:col-span-6 col-span-12'>
                    <div>
                        <img alt="404 Image" src='https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;