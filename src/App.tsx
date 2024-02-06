import React, { useContext, useState } from 'react';
import './App.scss';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'firebase-config';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contact from 'components/Contact';
import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import Dashboard from 'components/Dashboard/Dashboard';
import { AuthContextProvider, UserAuth } from 'context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'
import DashboardChart from 'components/Dashboard/DashboardChart';
import Expenses from 'components/Expenses/Expenses';
import Income from 'components/Income/Income';
import Categories from 'components/Categories/Categories';

function App() {

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [user, setUser] = useState<{ email: string } | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser: any) => {
			setUser(currentUser);
		});
	}, [user])


	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
			console.log(user);
		} catch (error: any) {
			console.log(error.message);
		}
	}

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			console.log(user);
		} catch (error: any) {
			console.log(error.message);
		}
	}

	const logout = async () => {
		await signOut(auth);
	}

	return (
		<div className="">
			{/* <div>
        <h3>Register user</h3>
        <input placeholder='email..' onChange={(ev) => { setRegisterEmail(ev.target.value) }} />
        <input placeholder='password..' onChange={(ev) => { setRegisterPassword(ev.target.value) }} />
        <button onClick={register}>Create user</button>
      </div>

      <div>
        <h3>Login</h3>
        <input placeholder='email..' onChange={(ev) => { setLoginEmail(ev.target.value) }} />
        <input placeholder='password..' onChange={(ev) => { setLoginPassword(ev.target.value) }} />
        <button onClick={login}>Login</button>
      </div>

      <h4>User logged in: {user?.email}</h4>
      <button onClick={logout}>Sign out!</button> */}
			<AuthContextProvider>
				<Router>
					{/* <Navbar /> */}
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route
							path='/dashboard'
							// element={
							// 	<ProtectedRoute>
									element={<Dashboard />} 
								/* </ProtectedRoute>
							} */
						/>
						<Route path='/dashboardChart' element={<DashboardChart />} />
						<Route path='/expenses' element={<Expenses />} />
						<Route path='/income' element={<Income />} />
						<Route path='/categories' element={<Categories />} />
						<Route path='*' element={<h1>Page not found</h1>} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	);
}

export default App;
