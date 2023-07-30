import { useState } from "react";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/pagelayouts/GuestLayoutComponent";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/core/PrimaryButton";

export default function ResetPassword() {
  // Get phone number and code from URL query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const code = searchParams.get('code');

  // State variables
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Form submit handler for resetting password
  const submit = (e) => {
    e.preventDefault();
    setErrors("");
    setMessage("");
    setProcessing(true);

    axiosClient
      .put("/resetPassword", {
        phoneNumber: phoneNumber,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        setMessage(response.data.message);
        setProcessing(false);
        navigate('/login'); // Navigate to login page after successful password reset
      })
      .catch((error) => {
        // console.log(error);
        setErrors(error.response.data.message || "An error occurred.");
        setProcessing(false);
      });
  };

  return (
    <GuestLayoutComponent title="Reset Password">
      <div className="mb-4 text-sm text-gray-600">
        This is the password reset field. Create a stronger password this time.
      </div>

      {message && <div className="mb-4 font-medium text-sm text-green-600">{message}</div>}

      <form onSubmit={submit} className="flex flex-col justify-center space-y-5">
        {/**Password */}
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
        {/**Password */}

        {/**Password Confirmation */}
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
        {/**Password Confirmation */}

        <div className="flex items-center justify-end mt-4">
          {/* Submit Button */}
          <PrimaryButton disabled={processing}>{processing ? 'Resetting' : 'Reset Password'}</PrimaryButton>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}
