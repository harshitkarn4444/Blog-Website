import './Show.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from '../../components/CreateBlog/CreateBlog';
import UpdateBlog from '../../components/UpdateBlog/UpdateBlog'; // Import UpdateBlog
import { useUser } from '../../context/UserContext'; // Import useUser

const Show = () => {
    const { thoughts, setThoughts, user, setUser } = useUser(); // Get thoughts and user from context
    const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
    const [isUpdateBlogOpen, setIsUpdateBlogOpen] = useState(false); // State for update modal
    const [selectedThought, setSelectedThought] = useState(null); // State for the thought to update
    const [showMyBlogs, setShowMyBlogs] = useState(false); // State to toggle view

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch thoughts from backend when the component mounts
        axios.get("http://localhost:3001/getThought")
            .then(response => {
                setThoughts(response.data); // Set thoughts in context
            })
            .catch(error => {
                console.error("Error fetching thoughts:", error);
            });
    }, [setThoughts]);

    const openCreateBlog = () => setIsCreateBlogOpen(true);
    const closeCreateBlog = () => setIsCreateBlogOpen(false);
    
    const toggleMyBlogs = () => {
        setShowMyBlogs(prev => !prev);
    };

    // Function to handle deletion of a thought
    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/deleteThought/${id}`)
          .then(() => {
              // Update the thoughts in the context
              setThoughts(prev => prev.filter(thought => thought._id !== id));
              toast.success("Deleted successfully");
              setTimeout(() => {
               navigate("/show");
           }, 2000);
          })
          .catch(error => {
              console.error("Error deleting thought:", error);
          });
    };

    // Function to open the update modal
    const handleUpdate = (thought) => {
        setSelectedThought(thought);
        setIsUpdateBlogOpen(true);
    };

    // Function to refresh thoughts after update
    const handleUpdateSuccess = () => {
        axios.get("http://localhost:3001/getThought")
            .then(response => {
                setThoughts(response.data);
            })
            .catch(error => {
                console.error("Error fetching thoughts:", error);
            });
    };

    // Function to handle user logout
    const handleLogout = () => {
        setUser(null); // Clear user from context
        navigate("/login"); // Navigate to login page
    };

    // Filter thoughts based on the logged-in user's author
    const filteredThoughts = showMyBlogs
        ? thoughts.filter(thought => thought.author === user.username)
        : thoughts;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>MyBlog</h1>
                </div>
                <ul className="navbar-links">
                    <li>Home</li>
                    <li onClick={openCreateBlog}>Create Blog</li>
                    <li onClick={toggleMyBlogs}>
                        {showMyBlogs ? 'All Blogs' : 'My Blogs'}
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </nav>
            <div className="card-grid">
                {filteredThoughts.map((thought, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-heading">{thought.heading}</h2>
                        <h4 className="card-subheading">{thought.subheading}</h4>
                        <p className="card-content">{thought.content}</p>
                        <p className="card-author">{thought.author}</p>
                        {showMyBlogs && (
                              <span className='card-button'>
                                 <button onClick={() => handleUpdate(thought)}>Update</button>
                                 <button onClick={() => handleDelete(thought._id)}>Delete</button>
                              </span>
                        )}
                    </div>
                ))}
            </div>
            <ToastContainer />
            <CreateBlog isOpen={isCreateBlogOpen} onClose={closeCreateBlog} />
            <UpdateBlog isOpen={isUpdateBlogOpen} onClose={() => setIsUpdateBlogOpen(false)} thought={selectedThought} onUpdateSuccess={handleUpdateSuccess} />
        </>
    );
}

export default Show;
