import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';
import axiosClient from '../../../axios';
import { FaCheckCircle } from 'react-icons/fa';

export default function UpdateProfileInformation({ fullName, userEmail, userPhoneNumber, className = '' }) {


  const [name, setName] = useState(fullName);
  const [email, setEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const recentlySuccessfulModal = () => {
            setRecentlySuccessful(true);

            const timer = setTimeout(() => {
                setRecentlySuccessful(false);
            }, 2000); // Set the time (in milliseconds) to show the success message
            return () => clearTimeout(timer);

    };



    const submit = (e) => {
        e.preventDefault();
        axiosClient.put('/updateProfile',{
            name:name, email:email, phoneNumber:phoneNumber
        }).then((response)=>{
            console.log(response.data.message);
            if(response.data.error){
                setError(response.data.error)
            }
            setErrors({})
            if (response.data.message){
                recentlySuccessfulModal();
            }
        }).catch((error)=>{
            console.log(error);
            setErrors(error.response.data.errors)
        })

    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                </p>

            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                           {/**Name */}
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                errors.name ? "border-red-500" : "focus:border-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            <label
              htmlFor="name"
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                name ? "-top-3 text-sm" : "top-1/2 -translate-y-1/2 text-sm"
              } ${name ? "bg-white px-1" : ""}`}
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
              type="tel"
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



                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-green-800 flex justify-center space-x-5">Saved.<FaCheckCircle/> </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
