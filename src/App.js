// App.js
import React, { useState } from 'react';
import RegistrationForm from './registeratiion/RegistrationForm';
import UserList from './user-list/UserList';
import UpdateForm from './user-list/UpdateForm';

function App() {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setShowUpdateForm(true);
    };

    const handleUpdateFormClose = () => {
        setShowUpdateForm(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <RegistrationForm />
            <br/>
            <UserList handleUpdateClick={handleUpdateClick} />
            {showUpdateForm && (
                <UpdateForm user={selectedUser} handleClose={handleUpdateFormClose} />
            )}
        </div>
    );
}

export default App;
