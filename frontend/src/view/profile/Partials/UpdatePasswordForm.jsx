// Importing required modules and components
import { Transition } from '@headlessui/react';
import PrimaryButton from '../../../components/core/PrimaryButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios';
import { FaCheckCircle } from 'react-icons/fa';

// UpdatePasswordForm component
export default function UpdatePasswordForm({ className = '' }) {
    // State variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // Function to show the "Saved" message and clear it after a timeout
    const recentlySuccessfulModal = () => {
        setRecentlySuccessful(true);

        const timer = setTimeout(() => {
            setRecentlySuccessful(false);
        }, 2000); // Set the time (in milliseconds) to show the success message
        return () => clearTimeout(timer);
    };

    // Using the react-router-dom's useNavigate hook to navigate to other pages
    const navigate = useNavigate();

    // Function to update the user's password
    const updatePassword = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Sending PUT request to the server to update the password
        axiosClient.put('/updatePassword', {
            currentPassword: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation
        }).then((response) => {
            if (response.data.message) {
                setErrors({});
                setError("");
                recentlySuccessfulModal();
            }
            if (response.data.error) {
                setError(response.data.error);
            }
        }).catch((error) => {
            // console.log(error);
            setErrors(error.response.data.errors);
        }).finally(() => {
            setProcessing(false);
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/* Current Password */}
                <div className="relative">
                    <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        autoComplete="currentPassword"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                            errors.currentPassword ? "border-red-500" : "focus:border-indigo-600"
                        } sm:text-sm sm:leading-6`}
                    />
                    <label
                        htmlFor="currentPassword"
                        className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                            currentPassword ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
                        } ${currentPassword ? "bg-white px-1" : ""}`}
                    >
                        Current Password
                    </label>
                    {errors.currentPassword && <div className="text-red-500">{errors.currentPassword}</div>}
                </div>
                {/* Current Password */}

                {/* Password */}
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                            errors.password ? "border-red-500" : "focus:border-indigo-600"
                        } sm:text-sm sm:leading-6`}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                            password ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
                        } ${password ? "bg-white px-1" : ""}`}
                    >
                        Password
                    </label>
                    {errors.password && <div className="text-red-500">{errors.password}</div>}
                </div>
                {/* Password */}

                {/* Password Confirmation */}
                <div className="relative">
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        autoComplete="passwordConfirmation"
                        required
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                            errors.passwordConfirmation ? "border-red-500" : "focus:border-indigo-600"
                        } sm:text-sm sm:leading-6`}
                    />
                    <label
                        htmlFor="passwordConfirmation"
                        className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                            passwordConfirmation ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
                        } ${passwordConfirmation ? "bg-white px-1" : ""}`}
                    >
                        Password Confirmation
                    </label>
                    {errors.passwordConfirmation && <div className="text-red-500">{errors.passwordConfirmation}</div>}
                </div>
                {/* Password Confirmation */}

                <div className="flex items-center gap-4">
                    {/* Button to update password */}
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    {/* Success message */}
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-green-600 flex space-x-5">Saved. <FaCheckCircle/></p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
