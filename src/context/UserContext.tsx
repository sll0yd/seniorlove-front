// This file is responsible for holding the user context.
// It provides a UserProvider component that wraps the application and provides the user object
// and a function to set the user object to the rest of the application.
// The custom useUser hook is used to access the user object and the setUser function from the UserContext.
import { createContext, useContext, useState, useEffect } from 'react';
import AxiosInstance from '../utils/axios';

// Typescript stuff, feel free to remove if you are not using Typescript
interface User {
  name: string;
  email: string;
  profilePicture: string;
}

// Typescript stuff, feel free to remove if you are not using Typescript
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// The creation of the context with the default value
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

// The custom hook to access the user object and the setUser function
// It's not mandatory to use this hook, you can use the context directly if you prefer
// But using useUser() in other components is more readable than using useContext(UserContext)
// So basically this hook is just a wrapper around useContext(UserContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// This UserProvider is need for main.tsx to wrap the entire application in it.
// It allows the user object to be available in the entire application.
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await AxiosInstance.get('/me');
      setUser(response.data);
    };
    //Est-ce qu'on a quelqu'un déjà connecté ?  user ? ->
    const token = localStorage.getItem('token');
    if (!user) {
      if (token) {
        getUser();
      }
    }
    //Est-ce qu'on a un token ? ->
    //On va devoir appeler la base, et puis mettre dans le ocntext les infos users
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
