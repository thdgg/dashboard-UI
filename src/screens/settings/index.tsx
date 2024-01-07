import React, { useState } from 'react';
import Container from '@/components/container';

const DeleteConfirmationPopup: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({
                                                                                                onConfirm,
                                                                                                onCancel,
                                                                                            }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Confirm Account Deletion</h2>
                <p className="text-gray-600 mb-4">Are you sure you want to delete your account?</p>
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Yes, Delete Account
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const Settings: React.FC = () => {
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

    const [firstName, setFirstName] = useState("John Bruh");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("user@example.com");

    const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
    const [isLastNameEditable, setIsLastNameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    const openDeleteConfirmation = () => {
        setIsDeleteConfirmationVisible(true);
    };

    const closeDeleteConfirmation = () => {
        setIsDeleteConfirmationVisible(false);
    };

    const handleDeleteAccount = () => {
        // Add logic for deleting the account
        closeDeleteConfirmation();
    };

    return (
        <Container>
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-5xl font-bold mb-8">Settings</h1>
                {/* Separator line */}
                <hr className="my-6 border-t border-gray-300" />

            {/* Editable first name */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">First Name</label>
                {isFirstNameEditable ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            className="text-blue-500 hover:underline ml-2"
                            onClick={() => setIsFirstNameEditable(!isFirstNameEditable)}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className="text-gray-600 mb-2">{firstName}</p>
                        <button
                            className="text-blue-500 hover:underline ml-2 text-xs"
                            onClick={() => setIsFirstNameEditable(!isFirstNameEditable)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Editable last name */}
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Last Name</label>
                {isLastNameEditable ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            className="text-blue-500 hover:underline ml-2"
                            onClick={() => setIsLastNameEditable(!isLastNameEditable)}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className="text-gray-600 mb-2">{lastName}</p>
                        <button
                            className="text-blue-500 hover:underline ml-2 text-xs"
                            onClick={() => setIsLastNameEditable(!isLastNameEditable)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Editable email settings */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Email Settings</h3>
                {isEmailEditable ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            className="text-blue-500 hover:underline ml-2"
                            onClick={() => setIsEmailEditable(!isEmailEditable)}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className="text-gray-600 mb-2">{email}</p>
                        <button
                            className="text-blue-500 hover:underline ml-2 text-xs"
                            onClick={() => setIsEmailEditable(!isEmailEditable)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Account deletion */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Account Deletion</h3>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={openDeleteConfirmation}
                >
                    Delete Account
                </button>
                {isDeleteConfirmationVisible && (
                    <DeleteConfirmationPopup
                        onConfirm={handleDeleteAccount}
                        onCancel={closeDeleteConfirmation}
                    />
                )}
            </div>
        </div>
        </Container>
    );
};

export default Settings;
