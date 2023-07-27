import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contents/ContextProvider";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/GuestLayoutComponent";
import PrimaryButton from "../../components/PrimaryButton";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Reset the password field using setData
      setPassword('');
    };
  }, []);


  const onSubmit = (ev) => {
    ev.preventDefault();
    setProcessing(true);

    axiosClient
      .post("/loginDataVerification", {
        phoneNumber,
        password,
      })
      .then((response) => {
        verifyPhone()

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {

          setErrors(error.response.data.errors);

        } else {
          console.log(error);
        }
        setProcessing(false);
      });
  };

  const verifyPhone = () => {
    try {
        axiosClient.post('/verify-phone', { phoneNumber })
      .then((response) => {


        if(response.data.error){
        setError(response.data.error)
        }
        const status='login';
        const url = `/verify-code?phoneNumber=${phoneNumber}&password=${password}&status=${status}`;
        navigate(url);
      })
      .catch((error) => {
        console.log(error)
        if(error.response.data.errors){
            setError(error.response.data.errors);
        }
        if(error.response.data.errorShow){
            setError(error.response.data.errorShow)
        }
        setProcessing(false);
      });


      } catch (error) {
        console.log(error)

      }

  };

  return (
    <GuestLayoutComponent title={'Sign in to your account'}>


      <div >
        <form onSubmit={onSubmit} className="space-y-6">

            {/**Phone Number */}
          <div className="relative">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="Number"
              autoComplete="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.phoneNumber ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}/>
            <label
              htmlFor="phoneNumber"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                phoneNumber ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${phoneNumber ? "bg-white px-1" : ""}`}
            >
              Phone Number
            </label>
            {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber[0]}</div>}
            </div>

          {/**Phone Number */}


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
              } sm:text-sm sm:leading-6`}/>
            <label
              htmlFor="password"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                password ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${password ? "bg-white px-1" : ""}`}
            >
            Password
            </label>
            {errors.password && <div className="text-red-500">{errors.password[0]}</div>}
          </div>

          {/**Password */}




          <div className="text-sm flex justify-end">
            <a
              href="/verify-phone"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
               <PrimaryButton disabled={processing}> {processing ? 'Signing in' : 'Sign in'} </PrimaryButton>
            </div>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member?<br/>
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </GuestLayoutComponent>
  );
}

export default Login;
