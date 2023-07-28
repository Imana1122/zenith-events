
import { useLocation, useNavigate } from 'react-router-dom';
import GuestLayoutComponent from '../../components/GuestLayoutComponent';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { useStateContext } from '../../contents/ContextProvider';
import PrimaryButton from '../../components/PrimaryButton';

export default function VerifyCode() {

    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const status = searchParams.get('status');
  const name = searchParams.get('fullName');
  const password = searchParams.get('password');
  const email = searchParams.get('email');
  const passwordConfirmation = searchParams.get('passwordConfirmation');


  const { setCurrentUser, setUserToken } = useStateContext();




  const navigate= useNavigate();

    const [processing, setProcessing ] =useState(false);
    const [processingResend, setProcessingResend ] =useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState("");
    const [messageResend, setMessageResend] = useState("");
    const [errors, setErrors] = useState("");
    const [error,setError] = useState("");
    const [seconds, setSeconds] = useState(120);


    useEffect(() => {
        setTimer()
      }, [seconds]);

    const setTimer = () => {
        if (seconds == 0) {
            // Clear the timer when seconds reach 60
            return;
          }

        const timer = setTimeout(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => {
          clearTimeout(timer);
        };
    }

    const submit = (e) => {
      e.preventDefault();
      setErrors("");
      setMessage("");
      setProcessing(true)

      axiosClient
        .post("/verify-code", { phoneNumber:phoneNumber,verificationCode:verificationCode})
        .then((response) => {

          setMessage(response.data.message);
          setMessageResend('')
          if(response.data.verificationCode){
            setErrors(response.data)
          }
          if(response.data.message){
            if (status === "reset-password") {
                const url = `/reset-password?phoneNumber=${phoneNumber}&code=${verificationCode}`;
                // Navigate(url);
                navigate(url);
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
                  setError('Error')
                }
              }
          }
          setProcessing(false)
        })
        .catch((error) => {

          setErrors(error.response.data.errors || "An error occurred.");
          setProcessing(false)
        });
    };

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
          console.log(error);
        }
      );
    }

    const login= () => {
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

          setErrors(error.response.data.errors);

        } else {
          console.log(error);
        }
        setProcessing(false);
      });

    }

    const resendCode = (e) => {
        e.preventDefault();
        setProcessingResend(true);

        axiosClient.post('/verify-phone', { phoneNumber })
          .then((response) => {
            setMessageResend(response.data.message);
            setMessage('')
            setProcessingResend(false)
            setSeconds(120);
            setTimer();

          })
          .catch((error) => {
            console.log(error)
        if(error.response.data.errors){
            setError(error.response.data.errors);
        }
        if(error.response.data.errorShow){
            setError(error.response.data.errorShow)
        }

            setProcessingResend(false);
          });


    };

    return (
        <GuestLayoutComponent title="Phone Verification">

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your phone number by filling in the
                code we just sent to you? If you didn't receive the code, we will gladly send you another.
            </div>



            <form onSubmit={submit}>
            {message && <div className="mb-4 font-medium text-sm text-green-600">{message}</div>}
            {messageResend && <div className="mb-4 font-medium text-sm text-green-600">{messageResend}</div>}
            {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}
         {/**Code */}
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
              } sm:text-sm sm:leading-6`}/>
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
            <p className={`text-sm font-serif  ${processingResend && 'font-thin'}`} onClick={resendCode}>{processingResend? 'Resending' : 'Resend'}</p>
            </div>


          {/**Code */}

          {/**Submit */}
                <div className="mt-4 flex items-center justify-between">
                <PrimaryButton disabled={processing}> {processing ? 'Sending Code' : 'Send Code'} </PrimaryButton>


            <div className='border-red-700 border-2 rounded-full px-1'>
            {seconds >= 0 && <p>{seconds}</p>}
            </div>

           </div>


                {/**Submit */}


            </form>
        </GuestLayoutComponent>
    );
}
