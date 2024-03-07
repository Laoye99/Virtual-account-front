// withSessionExpiration.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authConfig from 'src/configs/auth'

const withSessionExpiration = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    useEffect(() => {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        console.log('storedToken statussssssss',storedToken)
        if (storedToken == '' || storedToken == 'null') {

          toast.error('Session Expired')



          router.push('/login')
        } else {}


    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withSessionExpiration;
