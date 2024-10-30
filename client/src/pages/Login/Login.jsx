import './Login.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

const Login = () => {

    const { user, setUser, users, setUsers } = useUser(); // Use context to get user, setUser, users, and setUsers functions

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from backend when the component mounts
        axios.get("http://localhost:3001/getUsers")
            .then(response => {
                setUsers(response.data);   // Set users in context
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, [setUsers]);

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
        // Use users from context
        const usercheck = users.find(user => user.email === data.email && user.password === data.password);
        if (usercheck) {
            toast.success("Login successful");
            setUser(usercheck); // Set user in context
            setTimeout(() => {
                navigate("/show");
            }, 2000);
        } else {
            toast.error("Wrong password or username");
        }
    };

    const navigateToSignin = () => {
        navigate("/");
    };

    return (
        <div className="login">
            <form className='login-form' onSubmit={submitHandler}>
                <h2 className='login-heading'>Login</h2>
                <input type="email" placeholder='Email Address' className='form-input' name='email' onChange={changeHandler} required />
                <input type="password" placeholder='Password' className='form-input' name='password' onChange={changeHandler} required />
                <button type='submit'>Login Now</button>
                <div className="login-forgot">
                    <p>Don't have an account? <span onClick={navigateToSignin}>Signin</span></p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login