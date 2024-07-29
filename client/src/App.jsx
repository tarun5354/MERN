import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup'; 
import Login from './Login';
import Users from './Users';
import CreateUser from './CreateUser';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user); // Access user directly from the state
  const [loading, setLoading] = useState(true); // Add loading state
  console.log(user);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        console.log('User data fetched:', response.data); // Debug response
        dispatch(getUser(response.data));
      } catch (err) {
        console.error('Error fetching user data:', err); // Debug error
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    if (localStorage.getItem('authToken')) {
      fetchUserData();
    } else {
      setLoading(false); // No token means no user data to fetch
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching user data
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/home'
          element={user ? <Users /> : <Navigate to='/login' />}
        />
        <Route
          path='/create'
          element={user ? <CreateUser /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
