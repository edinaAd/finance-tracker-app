import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './SignUp.scss';
import { UserAuth } from 'context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = React.useState(false);
	const { createUser } = UserAuth();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError('');
		try {
			await createUser(registerEmail, registerPassword, name);
			navigate('/')
		} catch (e: any) {
			setError(e.message);
			console.log(e.message);
		}
	};

	return (
		<div className='signup-form'>
			<div className='container'>
				<div className='grid grid-cols-12'>
					<div className='flex justify-center items-center lg:col-span-6 md:col-span-6 col-span-12'>
						<div>
							<div>
								<h2 className="signup-form-title mb-4 text-3xl">Welcome to SpendWise</h2>
							</div>
							<div>
								<FormControl sx={{ mb: 3, width: '60%' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
									<OutlinedInput
										id="outlined-adornment-name"
										label="Name"
										onChange={(event) => setName(event.target.value)}
									/>
								</FormControl>
								<FormControl sx={{ mb: 3, width: '60%' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
									<OutlinedInput
										id="outlined-adornment-email"
										label="Email"
										onChange={(event) => setRegisterEmail(event.target.value)}

									/>
								</FormControl>
								<FormControl sx={{ mb: 3, width: '60%' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={showPassword ? 'text' : 'password'}
										onChange={(event) => setRegisterPassword(event.target.value)}
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
							<div className='signup-form-button mb-2'>
								<Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
							</div>
							<div>
								<span className='go-to'>Go To <span className='register'><Link to="/">Login</Link></span></span>
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

export default SignUp
