import React, { MouseEventHandler, useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import { supabase } from '../src/utils/SupabaseClient';
import Image from 'next/image';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [imageData, setImageData] = useState<any>();

  const handleLogOut: MouseEventHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/signin');
    }
  };

  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);

        // console.log("getProfile userId", user?.id);
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

      // console.log
      // console.log('dashboard user id', user?.id);

      if (user) {

        fetch('http://localhost:3000/api/all-screenshot', {
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
    // console.log('imageData', imageData);
  }, [user]);

  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }

  return (
    <div className="h-screen bg-gray-800 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-semibold text-white">
          Welcome, your email is {user.email}
        </h1>

        <form action='/api/screenshot' method='post' className="flex flex-col p-6 mt-2">
          <input type="url" className="px-4 py-2 rounded-md focus:outline-none focus:ring-2" placeholder="Enter Url" name="url" required />
          <input type="hidden" name="uid" value={user.id} />
          <input type="submit" className='px-6 py-3 mt-6 text-lg font-semibold text-white rounded-md bg-cyan-400 focus:outline-none focus:ring-2' value="Submit" />
        </form>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* {imageData && imageData.map((image) => {} */}

          {imageData?.imagesData.map((image: any) => (
            // console.log('image', image),
            <div key={image.id} className="group relative">
              {image.id}
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <RenderImage userId={user.id} path={image.name} />
              </div>
            </div>
          ))}
        </div>
        <button
          className="px-6 py-3 mt-6 text-lg font-semibold text-white bg-green-500 rounded-md focus:outline-none focus:ring-2"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;



const RenderImage: React.FC<any> = ({ userId, path }) => {
  const [publicUrl, setPublicUrl] = useState<any>("");
  useEffect(() => {
    (async () => {
      const { publicURL } = supabase.storage
        .from("screenshot-bucket")
        .getPublicUrl(`public/${userId}/${path}`);

      setPublicUrl(publicURL);
    })();
  }, [path, userId]);

  return <Image
    alt=""
    src={publicUrl}
    layout="fill"
    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
    // objectFit="cover"
    // width={200}
    // height={200}

    // className={cn(
    //   'duration-700 ease-in-out group-hover:opacity-75',
    //   isLoading
    //     ? 'scale-110 blur-2xl grayscale'
    //     : 'scale-100 blur-0 grayscale-0'
    // )}
    // onLoadingComplete={() => setLoading(false)}
  />
};