import { UserAuth } from 'context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = UserAuth();
  const { user } = UserAuth(); 

	const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');

    } catch (error) {
      throw(error);
    }
  };

  return (
    <div>
      dashboard
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
      <h1>Welcome to the Dashboard, {user?.displayName || 'Guest'}!</h1>

    </div>
  )
}

export default Dashboard
