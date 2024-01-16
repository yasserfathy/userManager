import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';
import ImageViewer from './ImageViewer';
import '../index.css';

const UserList = ({ handleUpdateClick: propHandleUpdateClick }) => {
    const [users, setUsers] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [showUpdateModal]);

    useEffect(() => {
        fetchUsers();
    }, [showDeleteModal]);

    const handleUpdateModalClose = async () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
        await fetchUsers();
    };

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = async () => {
        setShowDeleteModal(false);
        setSelectedUserId(null);
        await fetchUsers();
    };
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageViewer(true);
    };

    const handleImageViewerClose = () => {
        setSelectedImage('');
        setShowImageViewer(false);
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Email ID</th>
                    <th>Passport</th>
                    <th>User Photo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.mobileNo}</td>
                        <td>{user.emailId}</td>
                        <td>
                            {user.passportPath ? (
                                <button onClick={() => handleViewImage(user.passportPath)}>
                                    View Passport
                                </button>
                            ) : (
                                'N/A'
                            )}
                        </td>
                        <td>
                            {user.userPhotoPath ? (
                                <button onClick={() => handleViewImage(user.userPhotoPath)}>
                                    View User Photo
                                </button>
                            ) : (
                                'N/A'
                            )}
                        </td>
                        <td>
                            <button onClick={() => propHandleUpdateClick(user)}>Update</button>
                            <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showUpdateModal && (
                <UpdateForm user={selectedUser} handleClose={handleUpdateModalClose}/>
            )}
            {showDeleteModal && (
                <DeleteForm userId={selectedUserId} handleClose={handleDeleteModalClose}/>
            )}
            {showImageViewer && (
                <ImageViewer imageUrl={selectedImage} handleClose={handleImageViewerClose} />
            )}
        </div>
    );
};

export default UserList;
