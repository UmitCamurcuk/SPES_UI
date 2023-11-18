import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStateFromLocalStorage } from '../Storage/Localstorage';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage'dan token al
    const token = loadStateFromLocalStorage('token');

    // Token kontrolü yap
    if (!token) {
      // Token yoksa, kullanıcıyı oturum açma sayfasına yönlendir
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PrivateRoute;