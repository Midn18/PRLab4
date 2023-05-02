import React from 'react';

const EditButton = ({ showEditButtons, setShowEditButtons }) => {
    return (
        <button
            className='btn btn-primary align-self-center d-flex'
            onClick={() => setShowEditButtons(!showEditButtons)}>
            <span className='material-symbols-outlined'>edit</span>
        </button>
    );
};

export default EditButton;
