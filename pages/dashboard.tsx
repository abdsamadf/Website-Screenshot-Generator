import React, { MouseEventHandler, useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import { supabase } from '../src/utils/SupabaseClient';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();

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
      } else {
        router.push('/signin');
      }
    };

    getProfile();
  }, []);

  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-white">
          Welcome, your email is {user.email}
        </h1>

        <form action='/api/screenshot' method='post' className="flex flex-col p-6 mt-2">
            <input type="url" className="px-4 py-2 rounded-md focus:outline-none focus:ring-2" placeholder="Enter Url" name="url" required/>
            <input type="hidden" name="uid" value={user.id} />
            <input type="submit" className='px-6 py-3 mt-6 text-lg font-semibold text-white rounded-md bg-cyan-400 focus:outline-none focus:ring-2' value="Submit" />
        </form>


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