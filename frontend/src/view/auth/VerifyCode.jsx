import { useLocation, useNavigate } from 'react-router-dom';
import GuestLayoutComponent from '../../components/pagelayouts/GuestLayoutComponent';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { useStateContext } from '../../contents/ContextProvider';
import PrimaryButton from '../../components/core/PrimaryButton';
import { Transition } from '@headlessui/react';
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";

export default function VerifyCode() {
  // Get the query parameters from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const status = searchParams.get('status');
  const name = searchParams.get('fullName');
  const password = searchParams.get('password');
  const email = searchParams.get('email');
  const passwordConfirmation = searchParams.get('passwordConfirmation');

  // Get state and context using custom hook
  const { setCurrentUser, setUserToken } = useStateContext();
  const navigate = useNavigate();

  // State variables
  const [processing, setProcessing] = useState(false);
  const [processingResend, setProcessingResend] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageResend, setMessageResend] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);



  // Timer setup and countdown effect
  useEffect(() => {
    setTimer();
  }, [seconds]);

  const setTimer = () => {
    if (seconds === 0) {
      // Clear the timer when seconds reach 60
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  // Function to show the success message temporarily
  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
    }, 2000); // Set the time (in milliseconds) to show the success message

    return () => clearTimeout(timer);
  };

  // Form submit handler
  const submit = (e) => {
    e.preventDefault();
    ;
    setMessage("");
    setProcessing(true);

    axiosClient
      .post("/verify-code", { phoneNumber: phoneNumber, verificationCode: verificationCode })
      .then((response) => {
        setError('');
        setMessageResend('');
        setMessage(response.data.message);
        setMessageResend('');
        recentlySuccessfulModal();

        if (response.data.error) {
          setError(response.data.error);
          recentlySuccessfulModal();
        }

        if (response.data.message) {
          recentlySuccessfulModal();

          if (status === "reset-password") {
            const url = `/reset-password?phoneNumber=${phoneNumber}&code=${verificationCode}`;
            navigate(url); // Use navigate instead of Navigate(url);
          } else if (status === "signup") {
            if (name && email && phoneNumber && password && passwordConfirmation) {
              signup();
            } else {
              // Handle missing fields or show an error message to the user.
            }
          } else if (status === "login") {
            if (phoneNumber && password) {
              login();
            } else {
            //   console.log(error);
            }
          }
        }
        setProcessing(false);
      })
      .catch((error) => {
        // console.log(error)
        setProcessing(false);
      });
  };

  // Signup API call
  const signup = () => {
    axiosClient
      .post("/signup", {
        name,
        email,
        phoneNumber,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        setProcessing(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Login API call
  const login = () => {
    axiosClient
      .post("/login", {
        phoneNumber,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        setProcessing(false);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
        //   console.log(errors)
        } else {
        //   console.log(error);
        }
        setProcessing(false);
      });
  };

  // Resend verification code handler
  const resendCode = (e) => {
    e.preventDefault();
    setProcessingResend(true);

    if (status === "reset-password" || status === "login") {
      axiosClient.post('/verify-phone', { phoneNumber })
        .then((response) => {
          setMessage('');
          setError('');

          setMessageResend(response.data.message);
          setProcessingResend(false);
          setSeconds(120);
          setTimer();
          recentlySuccessfulModal();
        })
        .catch((error) => {
        //   console.log(error);

          if (error.response.data.errorShow) {
            setMessage('');
            setMessageResend('');
            setError(error.response.data.errorShow);
            recentlySuccessfulModal();
          }
          setProcessingResend(false);
        });
    } else if (status === "signup") {
      if (name && email && phoneNumber && password && passwordConfirmation) {
        axiosClient.post('/signupPhoneNumberVerification', { phoneNumber })
          .then((response) => {
            if (response.data.error) {
              setMessage('');
              setMessageResend('');

              setError(response.data.error);
              recentlySuccessfulModal();
            }
            setMessage('');
            setError('');


            setMessageResend(response.data.message);
            setProcessingResend(false);
            setSeconds(120);
            setTimer();
            recentlySuccessfulModal();
          })
          .catch((error) => {
            // console.log(error);

            if (error.response.data.errorShow) {
              setMessage('');
              setMessageResend('');
              setError(error.response.data.errorShow);
              recentlySuccessfulModal();
            }
            setProcessing(false);
          });
      } else {
        // Handle missing fields or show an error message to the user.
      }
    } else {
      setError('Error');
    }
  };

  return (
    <GuestLayoutComponent title="Phone Verification">

      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your phone number by filling in the
        code we just sent to you? If you didn't receive the code, we will gladly send you another.
      </div>
      <div className='my-5'>
        {/* Success Message */}
        <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-green-800 flex justify-center space-x-5">
            {messageResend && <span className='flex items-center'>{messageResend}<FaCheckCircle className='text-xl font-bold'/></span>}
            </p>
          </Transition>
          {/**Failure Message */}
          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-red-600 flex justify-center space-x-5">
            {error &&<span className='flex items-center'> {error}<BiSolidErrorCircle className='text-xl font-bold'/></span>}
            </p>
          </Transition>
          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-green-800 flex justify-center space-x-5">
              {message && <span className='flex items-center'>{message}<FaCheckCircle className='text-xl font-bold'/></span>}
            </p>
          </Transition>

      </div>

      <form onSubmit={submit}>
        {/* Verification Code Input */}
        <div className="relative">
          <input
            id="verificationCode"
            name="verificationCode"
            type="Number"
            autoComplete="verificationCode"
            required
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
              errors.verificationCode ? "border-red-500" : "focus:border-indigo-600"
            } sm:text-sm sm:leading-6`}
          />
            <label
            htmlFor="email"
            className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
              verificationCode ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
            } ${verificationCode ? "bg-white px-1" : ""}`}
          >
            Verification Code
          </label>
          {errors.verificationCode && <div className="text-red-500">{errors.verificationCode}</div>}
        </div>

        <div className='flex justify-end items-end'>
          {/* Resend Code */}
          <p className={`text-sm font-serif cursor-pointer ${processingResend && 'font-thin'}`} onClick={resendCode}>{processingResend ? 'Resending' : 'Resend'}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Submit Button */}
          <PrimaryButton disabled={processing}>{processing ? 'Sending Code' : 'Send Code'}</PrimaryButton>

          <div className='text-red-700'>
            {seconds >= 0 && <p>{seconds}</p>}
          </div>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}

