// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context with default values
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // Add users state
    const [thoughts, setThoughts] = useState([]); // Manage thoughts state

    return (
        <UserContext.Provider value={{ user, setUser, users, setUsers, thoughts, setThoughts   }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);
