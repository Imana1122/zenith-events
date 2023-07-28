import { useState } from "react";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/GuestLayoutComponent";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";


export default function VerifyPhone() {


    const [phoneNumber, setPhoneNumber] = useState("");

    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [ errors, setErrors] =useState({})
    const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    axiosClient.post('/verify-phone', { phoneNumber })
      .then((response) => {
        setMessage(response.data.message);
        setError(response.data.error)
        setProcessing(false)
        const status = 'reset-password';
        const url = `/verify-code?phoneNumber=${phoneNumber}&status=${status}`;
        // Navigate(url);
        navigate(url);
      })
      .catch((error) => {
        console.log(error)
        if(error.response.data.errors){
            setErrors(error.response.data.errors);
        }
        if(error.response.data.errorShow){
            setError(error.response.data.errorShow)
        }
        setProcessing(false);
      });
  };
    return (
        <GuestLayoutComponent title="Forgot Password">


            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your phoneNumber and we will verify your phone number and give you you a password
                reset field that will allow you to choose a new one.
            </div>

            {message && <div className="mb-4 font-medium text-sm text-green-600">{message}</div>}
            {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}

            <form onSubmit={submit}>
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
              htmlFor="email"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                phoneNumber ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${phoneNumber ? "bg-white px-1" : ""}`}
            >
              Phone Number
            </label>
            {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
            </div>

          {/**Phone Number */}

                <div className="flex items-center justify-end mt-4">
                <PrimaryButton disabled={processing}> {processing ? 'Verifying' : 'Verify'} </PrimaryButton>
                </div>
            </form>
        </GuestLayoutComponent>
    );
}
