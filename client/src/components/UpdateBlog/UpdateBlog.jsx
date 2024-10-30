// UpdateBlog.js
import './UpdateBlog.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBlog = ({ isOpen, onClose, thought, onUpdateSuccess }) => {
    const [data, setData] = useState({
        heading: '',
        subheading: '',
        content: '',
        author: ''
    });

    useEffect(() => {
        if (thought) {
            setData({
                heading: thought.heading,
                subheading: thought.subheading,
                content: thought.content,
                author: thought.author
            });
        }
    }, [thought]);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateThought/${thought._id}`, data)
            .then(() => {
                toast.success("Blog updated successfully");
                onUpdateSuccess(); // Callback to refresh the thoughts
                onClose(); // Close the modal
            })
            .catch(err => {
                console.error("Error updating thought:", err);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='update-heading'>Update Blog</h2>
                <form className='update-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Heading' className='form-input' name='heading' value={data.heading} onChange={changeHandler} required />
                    <input type="text" placeholder='SubHeading' className='form-input' name='subheading' value={data.subheading} onChange={changeHandler} required />
                    <input type="text" placeholder='Content' className='form-input' name='content' value={data.content} onChange={changeHandler} required />
                    <input type="text" placeholder='Author' className='form-input' name='author' value={data.author} onChange={changeHandler} required />
                    <button type='submit'>Update</button>
                    <button type="button" className='no' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateBlog;
