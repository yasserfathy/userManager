// DeleteForm.js
import React from 'react';
import axios from 'axios';
import '../index.css';

const DeleteForm = ({ userId, handleClose }) => {
    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            handleClose();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Delete User</h2>
                <p>Are you sure you want to delete this user?</p>
                <button onClick={handleDeleteSubmit}>Yes, Delete</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteForm;
