import { useState } from "react";
import DangerButton from "../../../components/DangerButton";
import Modal from "../../../components/Modal";
import SecondaryButton from "../../../components/SecondaryButton";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contents/ContextProvider";


export default function DeleteUserForm({ className = '' }) {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState("");
    const [processing, setProcessing] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        setProcessing(true)
        console.log(password)
        axiosClient
      .delete("/deleteUser", {
        data: {
            password: password,
          },
      })
      .then((response) => {
            setCurrentUser({})
            setUserToken(null)
      })
      .catch((error) => {
          console.log(error);
          setErrors(error.response.data.error)
          setProcessing(false)
        }
      );

    };

    const closeModal = () => {
    setConfirmingUserDeletion(false);
    setProcessing(false)
     // Reset password and errors when closing the modal
    setPassword("");
    setErrors("");
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </p>
                {message && <div className="mb-4 font-medium text-sm text-green-600">{message}</div>}
            </header>

            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    {/**Password */}
          <div className="relative mt-4">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}/>
            <label
              htmlFor="email"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                password ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${password ? "bg-white px-1" : ""}`}
            >
            Password
            </label>
            {errors && <div className="text-red-500">{errors}</div>}
            </div>

          {/**Password */}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing} type="submit">
                           { processing ? 'Deleting' : 'Delete Account'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
