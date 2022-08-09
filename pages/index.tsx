/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ClipboardCopyIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import { supabase } from '../src/utils/SupabaseClient';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast';

const profileUser = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    '/user.png',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  // { name: 'Team', href: '#', current: false },
]
const userNavigation = [
  { name: 'Sign out', href: '/signout' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [imageData, setImageData] = useState<any>();

  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);

      } else {
        router.push('/signin');
      }
    };

    getProfile();



  }, []);

  useEffect(() => {

    const allScreenshot = () => {
      // fetch api for call all-screenshot api and pass the user id to the api
      // and get the response and set the response to the state

      if (user) {

        fetch('/api/all-screenshot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log('data', data);
            setImageData(data);
            console.log('imageData', data);
          }).catch((err) => {
            console.log(err);
          }
          );
      }
    }
    allScreenshot();
  }, [user]);


  useEffect(() => {
    if (user) {
      userNavigation.unshift({ name: `Welcome ${user.email}`, href: '#' });
    }
  }, [user]);


  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex items-center flex-shrink-0">
                      <img
                        className="block w-auto h-8 lg:hidden"
                        src="/logo.png"
                        alt="Screenshot Generator"
                      />
                      {<img
                        className="hidden w-auto h-8 lg:block"
                        src="/logo.png"
                        alt="Screenshot Generator"
                      />}
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          // onClick={item.onClick}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <img className="w-8 h-8 rounded-full" src={profileUser.imageUrl} alt="User Icon" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="flex items-center -mr-2 sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src={profileUser.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div>
          <main>
            <div>
              {/* Dashboard content */}
              <div
                className="flex flex-col px-10 py-20 space-y-8 bg-indigo-50"
              >
                <div className="flex flex-col space-y-2 text-center">
                  <h2 className="text-4xl font-semibold tracking-tight">
                    Welcome back, User!
                  </h2>
                  <p>
                      Programmatically generate screenshots of any website in seconds.
                  </p>
                </div>
                <div
                  className="sm:mx-auto sm:w-full sm:max-w-3xl"
                >
                  <div>
                    <form
                      action='/api/screenshot'
                      method='post'
                      className='flex flex-row space-x-4'
                    >
                      <input
                        type="url"
                        placeholder="Enter Url"
                        className="block w-full px-4 py-3 font-medium tracking-wide placeholder-gray-400 border border-gray-300 shadow-sm appearance-none flex-2 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        name="url"
                        required
                      />
                      <input type="hidden" name="uid" value={user.id} />
                      <input
                        type="submit"
                        className='flex justify-center flex-1 w-full px-4 py-2 text-lg font-semibold tracking-wide text-white bg-indigo-600 border border-transparent rounded-2xl shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[150px]' value="Submit" />
                    </form>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50">
                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {imageData?.imagesData.map((image: any) => (
                      <div key={image.id} className='flex flex-col px-4 py-4 space-y-5 bg-white shadow-md rounded-2xl'>
                        <RenderImage userId={user.id} path={image.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* /End Dashboard Content */}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  // Define default options
                  className: '',
                  duration: 2000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },

                  // Default options for specific types
                  success: {
                    duration: 1000,
                    theme: {
                      primary: 'green',
                      secondary: 'black',
                    },
                  },
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard;



const RenderImage: React.FC<any> = ({ userId, path }) => {
  const [publicUrl, setPublicUrl] = useState<any>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  const copied = () => toast("Copied");

  useEffect(() => {
    (async () => {
      const { publicURL } = supabase.storage
        .from("screenshot-bucket")
        .getPublicUrl(`public/${userId}/${path}`);

      setPublicUrl(publicURL);
    })();
  }, [path, userId]);

  return (
    <>
      <div
        className="relative h-56 overflow-hidden aspect-w-1 aspect-h-1 rounded-2xl"
      >
        <Image
          alt=""
          src={publicUrl}
          layout="fill"
          // className="object-cover object-center w-full h-full lg:w-full lg:h-full"
          className={classNames(
            'duration-700 ease-in-out group-hover:opacity-75 object-cover object-center w-full h-full lg:w-full lg:h-full',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div
        className='flex flex-col space-y-2'
      >
        <div className="relative mt-1 overflow-hidden border border-gray-300 rounded-md shadow-sm">
          <input
            type="url"
            readOnly
            value={publicUrl}
            className='w-full px-2 py-1 font-medium tracking-wide placeholder-gray-400 shadow-sm appearance-none flex-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
          />
          <CopyToClipboard text={publicUrl}>
            <button className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 bg-white" onClick={copied}>
              <ClipboardCopyIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </button>
          </CopyToClipboard>
        </div>
        <div>
          {/* <p
            className='text-sm text-gray-500'
          >Jan 20, 2022</p> */}
        </div>
      </div>
    </>
  );
};