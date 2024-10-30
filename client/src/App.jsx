import React from "react";
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Show from './pages/Show/Show';
import { UserProvider } from './context/UserContext';

const App = () =>{
  return (
    <>
    <UserProvider>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/show' element={<Show/>}/>
    </Routes>
    </UserProvider>
    </>
  )


}

export default App