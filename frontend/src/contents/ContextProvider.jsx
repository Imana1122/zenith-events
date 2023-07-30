import { createContext, useContext, useState } from 'react';

// Create a new context with default values for currentUser, userToken, setCurrentUser, and setUserToken
const StateContext = createContext({
  currentUser: {},
  userToken: null,
  searchQuery: '',
  setCurrentUser: () => {},
  setUserToken: () => {},
  setSearchQuery: () => {},
});

// ContextProvider component that wraps the application and provides the state and functions to child components
export const ContextProvider = ({ children }) => {
  // State variables for currentUser, userToken, and searchQuery
  const [currentUser, _setCurrentUser] = useState(localStorage.getItem('USER') || '');
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [searchQuery, _setSearchQuery] = useState('');

  // Function to update the currentUser state
  const setCurrentUser = (user) => {
    if (user) {
      // If user is provided, set it in localStorage as a JSON string
      localStorage.setItem('USER', JSON.stringify(user));
    } else {
      // If user is not provided, remove the 'USER' key from localStorage
      localStorage.removeItem('USER');
    }
    // Update the currentUser state with the provided user object
    _setCurrentUser(user);
  };

  // Function to update the userToken state
  const setUserToken = (token) => {
    if (token) {
      // If token is provided, set it in localStorage
      localStorage.setItem('TOKEN', token);
    } else {
      // If token is not provided, remove the 'TOKEN' key from localStorage
      localStorage.removeItem('TOKEN');
    }
    // Update the userToken state with the provided token
    _setUserToken(token);
  };

  // Function to update the searchQuery state
  const setSearchQuery = (query) => {
    if (query) {
      // If query is provided, set it in localStorage
      localStorage.setItem('QUERY', query);
    } else {
      // If query is not provided, remove the 'QUERY' key from localStorage
      localStorage.removeItem('QUERY');
    }
    // Update the searchQuery state with the provided query
    _setSearchQuery(query);
  };

  // Provide the currentUser, userToken, searchQuery, setCurrentUser, setUserToken, and setSearchQuery as values to child components
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state and functions provided by the ContextProvider
export const useStateContext = () => useContext(StateContext);
