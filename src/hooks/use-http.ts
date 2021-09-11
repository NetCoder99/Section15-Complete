import { useState, useCallback } from 'react';

const useHttp = () => {
  console.log("useHttp.init");
  
  const apiStatusInit = {isLoading: false,errorMsg: ''};
  const [apiStatus, setApiStatus] = useState(apiStatusInit);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    console.log("useHttp.sendRequest");
    setApiStatus({isLoading: true,errorMsg: '',});
    try {
      const response = await fetch(requestConfig.url, {
        method:   requestConfig.method  ? requestConfig.method : 'GET',
        headers:  requestConfig.headers ? requestConfig.headers : {},
        body:     requestConfig.body    ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      console.log("useHttp.init.applyData");
      applyData(data);

      setApiStatus({isLoading: false,errorMsg: '',});
    } catch (err: any) {
      setApiStatus({isLoading: false,errorMsg: err.message || 'Something went wrong!',});
    }
  }, []);

  return {
    apiStatus,
    sendRequest,
  };
};

export default useHttp;