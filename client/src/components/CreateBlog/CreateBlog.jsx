import './CreateBlog.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

const CreateBlog = ({ isOpen, onClose }) => {
    const { setThoughts } = useUser(); // Use context to set thoughts
    const [users, setUsers] = useState([]); // State for users
    const [data, setData] = useState({
        heading: '',
        subheading: '',
        content: '',
        author: ''
    });

    useEffect(() => {
        // Fetch users from the backend when the component mounts
        axios.get("http://localhost:3001/getUsers")
            .then(response => {
                setUsers(response.data); // Set the users in state
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createThought", data)
            .then(result => {
                toast.success("Blog Created");
                // Fetch the updated thoughts after creation
                axios.get("http://localhost:3001/getThought")
                    .then(response => {
                        setThoughts(response.data); // Update thoughts in context
                        setTimeout(() => {
                            onClose();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error("Error fetching thoughts:", error);
                    });
            })
            .catch(err => {
                console.error("Error creating blog:", err);
                toast.error("Failed to create blog");
            });  
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='create-heading'>Create Blog</h2>
                <form className='create-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Heading' className='form-input' name='heading' onChange={changeHandler} required />
                    <input type="text" placeholder='SubHeading' className='form-input' name='subheading' onChange={changeHandler} required />
                    <input type="text" placeholder='Content' className='form-input' name='content' onChange={changeHandler} required />
                    <select name="author" className='form-input' onChange={changeHandler} required>
                        <option value="" disabled selected>Select Author</option>
                        {users.map(user => (
                            <option key={user._id} value={user.username}>{user.username}</option>
                        ))}
                    </select>
                    <button type='submit'>Create</button>
                    <button type="button" className='no' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;
