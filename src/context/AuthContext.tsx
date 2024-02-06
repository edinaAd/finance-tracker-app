import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase-config';
type User = {
  email: string;
  name: string;
};

// Define the type for your context
type UserContextType = {
  createUser: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
};

// Create the context with an initial value of undefined
const UserContext = createContext<any>(null)


export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);

  const createUser = async (email: string, password: string, name: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: name });
      setUser({ email: user.email || '', name }); // Update the user state with the name

    } catch (error) {
      throw error; // Re-throw the error if needed
    }
  };
  
  const login = async (email: string, password: string): Promise<void> => {
    try {
      signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error;
    }
  }

  const logout = () => {
    return signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};