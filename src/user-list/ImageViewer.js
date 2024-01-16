import React from 'react';
import './ImageViewer.css';

const ImageViewer = ({ imageUrl, handleClose }) => {
    const serverImageUrl = `http://localhost:8080/api/users/uploads/${imageUrl}`;

    return (
        <div className="image-viewer-overlay">
            <div className="image-viewer">
                <div className="image-container">
                    <img src={serverImageUrl} alt="User Image" />
                </div>
                <button className="close-button" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ImageViewer;
