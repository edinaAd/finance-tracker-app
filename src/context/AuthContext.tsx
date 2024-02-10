import { createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import axios from 'axios';
import { addUserToFirestore } from 'api/api-users';

type User = {
	name: string;
};

type UserContextType = {
	createUser: (email: string, password: string) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	user: User | null;
};

const UserContext = createContext<any>(null)


export const AuthContextProvider = ({ children }: any) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const userData = localStorage.getItem('userData');
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const createUser = async (email: string, password: string, name: string): Promise<void> => {
		try {
			const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClJHtV6gJv1zUz1csh9BFlM-x1_FQxuLs`, {
				email: email,
				password: password,
				displayName: name,
				returnSecureToken: true
			});

			const authToken = response.data.idToken;

			await addUserToFirestore(email, name, response.data.localId, authToken);
			
			console.log('User created successfully.');
			console.log('ID Token:', response.data.idToken);

		} catch (error: any) {
			console.error('Error creating user:', error.message);
		}
	};

	const login = async (email: string, password: string): Promise<any> => {
		try {
			const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClJHtV6gJv1zUz1csh9BFlM-x1_FQxuLs`, {
				email: email,
				password: password,
				returnSecureToken: true
			});

			const userData = { name: response.data.displayName };

			localStorage.setItem('userData', JSON.stringify(userData));

			setUser(userData);


			console.log('User logged in successfully.');
			console.log('ID Token:', response.data.idToken);

			return response;
		} catch (error: any) {
			console.error('Error logging in:', error.message);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem('userData');
			localStorage.removeItem('authToken');

			setUser(null);
		  } catch (error: any) {
			console.error('Error logging out:', error.message);
		  }
	}
	// const logout = () => {
	// 	return signOut(auth)
	// }

	return (
		<UserContext.Provider value={{ createUser, user, logout, login }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};