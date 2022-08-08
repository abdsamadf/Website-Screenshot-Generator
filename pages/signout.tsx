import React, { MouseEventHandler, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import { supabase } from '../src/utils/SupabaseClient';


const SignOut = () => {

    const router = useRouter();

    useEffect(() => {

        const handleLogout = async () => {
            const { error } = await supabase.auth.signOut();

            if (error) {
                alert(JSON.stringify(error));
            } else {
                router.push('/signin');
            }
        };

        handleLogout();
    }, []);

    // empty return
    return <></>

}

export default SignOut;