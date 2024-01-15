import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                // Handle error, you can display an error message
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Email ID</th>
                    <th>Passport</th>
                    <th>User Photo</th>
                    {/* Add headers for other user properties */}
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
                                <a href={user.passportPath} target="_blank" rel="noopener noreferrer">
                                    View Passport
                                </a>
                            ) : (
                                'N/A'
                            )}
                        </td>
                        <td>
                            {user.userPhotoPath ? (
                                <a href={user.userPhotoPath} target="_blank" rel="noopener noreferrer">
                                    View User Photo
                                </a>
                            ) : (
                                'N/A'
                            )}
                        </td>
                        {/* Add cells for other user properties */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
