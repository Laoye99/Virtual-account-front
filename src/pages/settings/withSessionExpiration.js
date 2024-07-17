// withSessionExpiration.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authConfig from 'src/configs/auth'

const withSessionExpiration = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    // Check session expiration on mount
    useEffect(() => {

        // Perform session expiration check logic here
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        console.log('storedToken statussssssss',storedToken)
        if (storedToken == '' || storedToken == 'null') {

          toast.error('Session Expired')

         // setIsToastShown(true)

          // Redirect to login page after session expiration
          router.push('/login')
        } else {}

      // Perform session expiration check logic here
    //   const isSessionExpired = checkSessionExpiration(); // Implement this function

    //   // If session expired, redirect to login page
    //   if (isSessionExpired) {
    //     router.push('/login');
    //   }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withSessionExpiration;
