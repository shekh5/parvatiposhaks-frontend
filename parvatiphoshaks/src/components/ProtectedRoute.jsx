import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }
  return element;
};

export default ProtectedRoute;
