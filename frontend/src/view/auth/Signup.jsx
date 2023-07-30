import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/pagelayouts/GuestLayoutComponent";
import PrimaryButton from "../../components/core/PrimaryButton";
import TButton from "../../components/core/TButton";
import { BiArrowBack } from "react-icons/bi";

export default function Signup() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setProcessing(true)
    setErrors({});

    axiosClient
      .post("/signupDataVerification", {
        name: fullName,
        email,
        phoneNumber,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {

        verifyPhone();
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response && error.response.data && error.response.data.errors) {

            setErrors(error.response.data.errors);

        } else {
        //   console.log(error);
        }
      });
  }

  const verifyPhone = () => {
    try {
        axiosClient.post('/signupPhoneNumberVerification', { phoneNumber })
      .then((response) => {

        if(response.data.error){
        setError(response.data.error)
        }
        const status='signup';
        const url = `/verify-code?fullName=${fullName}&email=${email}&phoneNumber=${phoneNumber}&password=${password}&passwordConfirmation=${passwordConfirmation}&status=${status}`;
        navigate(url);
      })
      .catch((error) => {
        // console.log(error)
        if(error.response.data.errors){
            setError(error.response.data.errors);
        }
        if(error.response.data.errorShow){
            setError(error.response.data.errorShow)
        }
        setProcessing(false);
      });


      } catch (error) {
        // console.log(error)

      }

  };

  return (
    <GuestLayoutComponent title="Sign up for an account">


      <div>
      {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
            {/**Name */}
          <div className="relative">
            <input
              id="full-name"
              name="name"
              type="text"
              placeholder=" "
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.name ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="full-name"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                fullName ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${fullName ? "bg-white px-1" : ""}`}
            >
              Full Name
            </label>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
          </div>


          {/**Email */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="text"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.email ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="email"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                email ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${email ? "bg-white px-1" : ""}`}
            >
              Email
            </label>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/**Email */}

          {/**Phone Number */}
          <div className="relative">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="Number"
              placeholder=" "
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.phoneNumber ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="full-name"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                phoneNumber ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${phoneNumber ? "bg-white px-1" : ""}`}
            >
              Phone Number
            </label>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber[0]}</p>}
          </div>

          {/**PhoneNumber */}

          {/**Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.password ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="full-name"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                password ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${password ? "bg-white px-1" : ""}`}
            >
              Password
            </label>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>
          {/**Password */}


          {/**Confirm Password */}
          <div className="relative">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              placeholder=" "
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.passwordConfirmation ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="full-name"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                passwordConfirmation ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${passwordConfirmation ? "bg-white px-1" : ""}`}
            >
              Password Confirmation
            </label>
            {errors.passwordConfirmation && <p className="text-red-500 text-sm mt-1">{errors.passwordConfirmation[0]}</p>}
          </div>
          {/**Confirm Password */}



          <div className="flex justify-center items-center">
          <PrimaryButton disabled={processing}> {processing ? 'Signing up' : 'Signup'} </PrimaryButton>
          </div>


        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already a member?<br/>
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in to your account
          </Link>
        </p>
        <div>
        <TButton color="indigo" to="/" circle>
            <BiArrowBack/>
        </TButton>
        </div>
      </div>
    </GuestLayoutComponent>
  );
}
