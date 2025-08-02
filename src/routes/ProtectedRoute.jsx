import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = "DUMMY"
  return accessToken ? children : children;
};

export default ProtectedRoute;
