import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Home from './screens/Home';
// import Profile from './screens/Profile';
// import Signup from './screens/Signup';
// import Signin from './screens/Signin';
// import CreatePost from './screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import Routing from './components/Navbar/Routing';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
