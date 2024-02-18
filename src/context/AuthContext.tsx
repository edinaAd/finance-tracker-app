import { createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import axios from 'axios';
import { addUserToFirestore } from 'services/users-service';

type User = {
	name?: string;
	authToken?: string;
    userId?: string;
	loginRedirect?: boolean;
};


type UserContextType = {
	createUser: (email: string, password: string) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	user: User | null;
};

const UserContext = createContext<any>(null)


export const AuthContextProvider = ({ children }: any) => {
	console.log("AuthContextProvider");
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const userData = localStorage.getItem('userData');
		console.log("userData", userData);
		if (userData) {
			const parsedUserData = JSON.parse(userData);
			setUser(parsedUserData.user);
		} else {
			setUser({ loginRedirect: true });
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
			const userId = response.data.localId;

			await addUserToFirestore(email, name, userId, authToken);

			console.log('User created successfully.');
			console.log('ID Token:', response.data.idToken);

		} catch (error: any) {
			console.error('Error creating user:', error.message);
			throw error;
		}
	};

	const login = async (email: string, password: string): Promise<any> => {
		try {
			const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClJHtV6gJv1zUz1csh9BFlM-x1_FQxuLs`, {
				email: email,
				password: password,
				returnSecureToken: true
			});

			console.log(response)
			const userData: User = {
				name: response.data.displayName,
				authToken: response.data.idToken,
				userId: response.data.localId
			};

            localStorage.setItem('userData', JSON.stringify({ user: userData }));

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

	return (
		<UserContext.Provider value={{ createUser, user, logout, login }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};