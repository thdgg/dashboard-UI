import React, { useEffect, useState } from "react";
import Container from "@/components/container";
import { useMediaQuery } from "react-responsive";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import UserDashboardAI from "@/apis/UserDashboardAI";
import useAxiosFunction from "@/hooks/useAxiosFunction";

type EditableFieldProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  originalValue: string;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmationPopup: React.FC<
  { onConfirm: () => void; onCancel: () => void }
> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Account Deletion</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete your account?
        </p>
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

const EditableField = (
  { label, value, setValue, originalValue, isEditable, setIsEditable }:
    EditableFieldProps,
) => {
  const onCancel = () => {
    setValue(originalValue);
    setIsEditable(false);
  };

  const onToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {label}
      </label>
      {isEditable
        ? (
          <div className="flex flex-col items-start">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div>
              <button
                className="text-blue-500 hover:underline mt-2 disabled:opacity-50 disabled:no-underline"
                onClick={onToggle}
                disabled={value.trim() === "" || value === originalValue}
              >
                Save
              </button>
              <button
                className="text-blue-500 hover:underline ml-2 mt-2 disabled:opacity-50 disabled:no-underline"
                onClick={onCancel}
                disabled={value.trim() === ""}
              >
                Cancel
              </button>
            </div>
          </div>
        )
        : (
          <div className="flex items-center justify-between">
            <p className="text-gray-600 mb-2">{value}</p>
            <button
              className="text-blue-500 hover:underline"
              onClick={onToggle}
            >
              Edit
            </button>
          </div>
        )}
    </div>
  );
};

const Settings: React.FC = () => {
  const { auth } = useAuth();
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const isBelowSm = useMediaQuery({ query: "(max-width: 640px)" });

  const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
  const [isLastNameEditable, setIsLastNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [deleteUserResponse, deleteUserError, deleteUserLoading, deleteUserAF] =
    useAxiosFunction();

  const [userResponse, userError, userLoading, userRefetch] = useAxios({
    axiosInstance: UserDashboardAI,
    method: "get",
    url: "/users/profile?username=" + auth?.userName,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    },
  });

  const [firstName, setFirstName] = useState(userResponse?.data.firstname);
  const [lastName, setLastName] = useState(userResponse?.data.lastname);
  const [email, setEmail] = useState(userResponse?.data.email);

  const originalFirstName = userResponse?.data.firstname;
  const originalLastName = userResponse?.data.lastname;
  const originalEmail = userResponse?.data.email;

  useEffect(() => {
    if (userResponse?.data) {
      setFirstName(userResponse.data.firstname);
      setLastName(userResponse.data.lastname);
      setEmail(userResponse.data.email);
    }
  }, [userResponse]);

  const handleDeleteAccount = () => {
    // Add logic for deleting the account
    deleteUserAF({
      axiosInstance: UserDashboardAI,
      method: "delete",
      url: `/users/delete?username=${auth?.userName}`,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      },
    });
    setIsDeleteConfirmationVisible(false);
  };
  //  console.log(firstName, lastName, email)
  return (
    <Container>
      <h1 className="text-5xl font-bold mb-8">Settings</h1>
      <div
        className={`sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 ${
          isBelowSm && "w-1/2"
        }`}
      >
        {
          /* {(firstName && lastName && email) !== undefined && (
          <div> */
        }
        {/* Editable first name */}
        <EditableField
          label="First Name"
          value={firstName}
          setValue={setFirstName}
          originalValue={originalFirstName}
          isEditable={isFirstNameEditable}
          setIsEditable={setIsFirstNameEditable}
        />

        {/* Editable last name */}
        <EditableField
          label="Last Name"
          value={lastName}
          setValue={setLastName}
          originalValue={originalLastName}
          isEditable={isLastNameEditable}
          setIsEditable={setIsLastNameEditable}
        />

        {/* Editable email settings */}
        <EditableField
          label="Email"
          value={email}
          setValue={setEmail}
          originalValue={originalEmail}
          isEditable={isEmailEditable}
          setIsEditable={setIsEmailEditable}
        />
        {/* </div> */}
        {/* )} */}

        {/* Account deletion */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Account Deletion</h3>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setIsDeleteConfirmationVisible(true)}
          >
            Delete Account
          </button>
          {isDeleteConfirmationVisible && (
            <DeleteConfirmationPopup
              onConfirm={handleDeleteAccount}
              onCancel={() => setIsDeleteConfirmationVisible(false)}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Settings;
