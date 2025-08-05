import React, { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes.jsx';
import './App.css';
import ProtectedRoute from './routes/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
export const PassingValue = createContext()



const Loader = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-900'></div>
  </div>
);

function App() {
  const [value, setValue ] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setValue(response.data);
        console.log("response.data", response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false)
      }
    };
    fetchBookings();
  }, [])
  return (
    
    <BrowserRouter>
    <PassingValue.Provider value={{value, loading, setValue, setLoading }}>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
        <Toaster />
      </Suspense>
      </PassingValue.Provider>
    </BrowserRouter>
   
  );
}

export default App;
