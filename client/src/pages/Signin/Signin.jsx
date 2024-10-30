import './Signin.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

const Signin = () => {

    const { user, setUser, users, setUsers } = useUser(); // Use context to get user, setUser, users, and setUsers functions

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", data)
            .then(result => {
                toast.success("Account Created");
                // Fetch the updated users list after sign-up
                axios.get("http://localhost:3001/getUsers")
                .then(response => {
                    setUsers(response.data); // Update users in context
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                })
                .catch(error => {
                    console.error("Error fetching users after sign-up:", error);
                });
                    
            })
            .catch(err => console.log(err));    
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="signin">
            <form className='signin-form' onSubmit={submitHandler}>
                <h2 className='signin-heading'>Signin</h2>
                <input type="text" placeholder='Username' className='form-input' name='username' onChange={changeHandler} required />
                <input type="email" placeholder='Email Address' className='form-input' name='email' onChange={changeHandler} required />
                <input type="password" placeholder='Password' className='form-input' name='password' onChange={changeHandler} required />
                <button type='submit'>Create Account</button>
                <div className="login-forgot">
                    <p>Already have an account? <span onClick={navigateToLogin}>Login</span></p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signin