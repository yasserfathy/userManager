import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [user, setUser] = useState({
        name: '',
        mobileNo: '',
        emailId: '',
        nationality: '',
        dateOfBirth: '',
        passportNo: '',
        passportExpiryDate: '',
        passportPath: null, // Updated to allow file upload
        userPhotoPath: null, // Updated to allow file upload
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in user) {
                formData.append(key, user[key]);
            }

            await axios.post('http://localhost:8080/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success, you can redirect or show a success message

            // Optional: Clear the form after successful submission
            setUser({
                name: '',
                mobileNo: '',
                emailId: '',
                nationality: '',
                dateOfBirth: '',
                passportNo: '',
                passportExpiryDate: '',
                passportPath: null,
                userPhotoPath: null,
            });
        } catch (error) {
            // Handle error, you can display an error message
            console.error('Registration failed:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={user.name} onChange={handleChange} />
            </label>
            {/* Add similar input fields for other user properties */}
            <label>
                Passport File:
                <input type="file" name="passportPath" onChange={handleFileChange} />
            </label>
            <label>
                User Photo File:
                <input type="file" name="userPhotoPath" onChange={handleFileChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
