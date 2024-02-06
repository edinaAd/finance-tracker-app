import { AppBar, Box, Button, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { UserAuth } from 'context/AuthContext'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardChart from './DashboardChart';

const Dashboard = () => {
	const { logout } = UserAuth();
	const { user } = UserAuth();

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');

		} catch (error) {
			throw (error);
		}
	};
	const leftDrawerWidth = 240;
	const rightDrawerWidth = 300;

	return (
		<div>
			{/* dashboard
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    */}
			<Box sx={{ display: 'flex', margin: '30px' }}>
				<CssBaseline />
				<AppBar sx={{ zIndex: (theme: any) => theme.zIndex.drawer + 1 }}>
					<Toolbar>
						<Typography variant="h6" noWrap component="div">
							SpendWise
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					sx={{
						width: leftDrawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							width: leftDrawerWidth,
							boxSizing: 'border-box',
							height: `calc(100vh - 120px)`,
							borderRadius: '10px',
							marginTop: '90px',
							marginBottom: '30px',
							marginLeft: '30px',
							marginRight: '30px',
							position: 'fixed',

						},
					}}
				>
					<Box sx={{ overflow: 'auto' }}>
						<div className='user-info'>
							<span className='flex justify-center'><AccountCircleIcon /></span>
							<h1 className='flex justify-center capitalize'>{user?.displayName || 'Guest'}</h1>
						</div>
						<Divider />
						<List>
							{['dashboard', 'expenses', 'income', 'categories'].map((text, index) => (
								<React.Fragment key={text}>
									<ListItem disablePadding>
										<ListItemButton component={Link} to={`/${text}`}>
											<ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
										</ListItemButton>
									</ListItem>
									{index < 3 && <Divider />} {/* Add Divider only for the first 3 items */}
								</React.Fragment>
							))}
						</List>
					</Box>
					<div className='flex justify-center logout-button'>
						<Button variant="contained" onClick={logout}>LOGOUT</Button>
					</div>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, padding: '0px 24px' }}>
					<Toolbar />
					<div className='grid grid-cols-12 gap-5'>
						<div className='md:col-span-6 lg:col-span-6 col-span-12'>
							<div className='total-income'>
								<span className='flex justify-center font-bold'>$43,300</span>
								<span className='flex justify-center'>Income</span>
							</div>
						</div>
						<div className='md:col-span-6 lg:col-span-6 col-span-12'>
							<div className='total-income'>
								<span className='flex justify-center font-bold'>$43,300</span>
								<span className='flex justify-center'>Expenses</span>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-12'>
						<div className='col-span-12 flex justify-center'>
							<div className='balance'>
								<span className='flex justify-center font-bold'>$43,300</span>
								<span className='flex justify-center'>Balance</span>
							</div>
						</div>
					</div>
					<div>
						<DashboardChart />
					</div>
				</Box>

			</Box>
		</div>
	)
}

export default Dashboard
