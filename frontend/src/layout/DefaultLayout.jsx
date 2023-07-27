import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {GiHamburgerMenu} from "react-icons/gi";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contents/ContextProvider";

import ZenithEventsLogo from '../assets/zenitheventslogo.svg';
import axiosClient from "../axios";
import Footer from "../components/Footer";
import { admin } from "../admin";

const navigation = [
  { name: "Home", to: "/" },

  { name: "Training", to: "/events" },

  { name: "Ticket", to: "/ticket" },

  { name: "Contact", to: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    useEffect(() => {
      setCurrentUser(JSON.parse(localStorage.getItem('USER')));
    }, []); // Run the effect only once when the component mounts



    if (!userToken) {
      return <Navigate to="login" />;
    }

  const logout = (ev) => {
    ev.preventDefault();
    console.log(currentUser, userToken)
    axiosClient.post('/logout')
    .then(res => {
        setCurrentUser({})
        setUserToken(null)
    })
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20"
                        src={ZenithEventsLogo}
                        alt="ZenithEvents"
                      />
                    </div>

                  </div>
                  <div className="hidden md:flex md:items-center md:justify-between ">
                  <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                        <NavLink
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          location.pathname === item.to
                            ?'border-indigo-400 text-gray-900 focus:border-indigo-700 '
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none '
                        )}

                      >
                        {item.name}
                      </NavLink>


                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-purple-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="w-8 h-8 bg-purple-900 text-white p-2 rounded-full" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                <p className="block px-4 py-2 text-xs text-purple-900"> {currentUser.name}<br/>{currentUser.email}</p>
                            </Menu.Item>

                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className={
                                  "block px-4 py-2 text-sm text-slate-700"
                                }
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                href={`/profile?name=${currentUser.name}&email=${currentUser.email}&phoneNumber=${currentUser.phoneNumber}`}

                                className={
                                  "block px-4 py-2 text-sm text-slate-700"
                                }
                              >
                                Profile
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                href={`/userBookings?name=${currentUser.name}&email=${currentUser.email}&phoneNumber=${currentUser.phoneNumber}`}

                                className={
                                  "block px-4 py-2 text-sm text-slate-700"
                                }
                              >
                                Bookings
                              </a>
                            </Menu.Item>

                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-black hover:text-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <GiHamburgerMenu
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                 <NavLink
                 key={item.name}
                 to={item.to}
                 className={classNames(
                    location.pathname === item.to
                      ?'border-indigo-400 text-gray-900 focus:border-indigo-700 '
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ',
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none mr-3 '
                  )}
               >
                 {item.name}
               </NavLink>



                  ))}
                </div>
                <div className="border-t border-b border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className="w-8 h-8 bg-purple-900 text-white p-2 rounded-full" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-slate-700">
                        {currentUser.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-slate-700">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-purple-900 hover:text-white"
                    >
                      Signout
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href={`/profile?name=${currentUser.name}&email=${currentUser.email}&phoneNumber=${currentUser.phoneNumber}`}
                      className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-purple-900 hover:text-white"
                    >
                      Profile
                    </Disclosure.Button>



                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Outlet />
        <Footer />

      </div>
    </>
  );
}
