import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const UpdateForm = ({ user, handleClose }) => {
    const [updatedUser, setUpdatedUser] = useState({
        name: user.name,
        mobileNo: user.mobileNo,
        emailId: user.emailId,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        passportNo: user.passportNo,
        passportExpiryDate: user.passportExpiryDate,
    });

    const handleUpdateChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedDateOfBirth = new Date(updatedUser.dateOfBirth).toISOString();
            const formattedPassportExpiryDate = new Date(updatedUser.passportExpiryDate).toISOString();

            await axios.put(`http://localhost:8080/api/users/${user.id}`, {
                id: user.id,
                name: updatedUser.name,
                mobileNo: updatedUser.mobileNo,
                emailId: updatedUser.emailId,
                nationality: updatedUser.nationality,
                dateOfBirth: formattedDateOfBirth,
                passportNo: updatedUser.passportNo,
                passportExpiryDate: formattedPassportExpiryDate,
            }, {
                withCredentials: true,
            });
            handleClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update User</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Mobile No:
                        <input
                            type="text"
                            name="mobileNo"
                            value={updatedUser.mobileNo}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Email ID:
                        <input
                            type="text"
                            name="emailId"
                            value={updatedUser.emailId}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Nationality:
                        <input
                            type="text"
                            name="nationality"
                            value={updatedUser.nationality}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="text"
                            name="dateOfBirth"
                            value={updatedUser.dateOfBirth}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Passport No:
                        <input
                            type="text"
                            name="passportNo"
                            value={updatedUser.passportNo}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <label>
                        Passport Expiry Date:
                        <input
                            type="text"
                            name="passportExpiryDate"
                            value={updatedUser.passportExpiryDate}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
