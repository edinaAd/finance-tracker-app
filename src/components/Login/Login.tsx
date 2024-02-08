import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

import './Login.scss';
import { Link } from 'react-router-dom';
import { UserAuth } from 'context/AuthContext';


const Login = () => {
	const navigate = useNavigate();

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [error, setError] = useState('');

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const { login } = UserAuth();

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setError('')
		console.log(loginEmail, loginPassword)
		try {

			const response = await login(loginEmail, loginPassword);
			console.log(response)
			const authToken = response.data.idToken;

			localStorage.setItem('authToken', authToken);
			navigate('/dashboard');

		} catch (error: any) {
			setError(error.message);
			console.log(error.message);
		}
	}

	return (
		<div className='login-form'>
			<div className='container'>
				<div className='grid grid-cols-12'>
					<div className='flex justify-center items-center lg:col-span-6 md:col-span-6 col-span-12'>
						<div>
							<div>
								<h2 className="login-form-title mb-4 text-3xl">Welcome to SpendWise</h2>
							</div>
							<div>
								<FormControl sx={{ mb: 3, width: '65%' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
									<OutlinedInput
										id="outlined-adornment-email"
										label="Email"
										onChange={(event) => setLoginEmail(event.target.value)}
									/>
								</FormControl>
								<FormControl sx={{ mb: 3, width: '65%' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={showPassword ? 'text' : 'password'}
										onChange={(event) => setLoginPassword(event.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="Password"
									/>
								</FormControl>
							</div>
							<div className='login-form-button mb-2'>
								<Button variant="contained" onClick={handleLogin}>LOG IN</Button>
							</div>
							<div>
								<span className='new-to'>New to SpendWise? <span className='register'><Link to="/signup">Sign Up</Link></span></span>
							</div>
						</div>
					</div>
					<div className='flex justify-center lg:col-span-6 md:col-span-6 col-span-12'>
						<img alt='Welcome Screen' className='max-w-[75%]' src={require('../../images/welcome.jpg')} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
