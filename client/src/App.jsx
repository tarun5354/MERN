import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup'; 
import Login from './Login';
import Users from './Users';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateUser from './CreateUser'
import  {useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {getUser} from './redux/userSlice'

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchData= async()=>{
        try{
           const response= await axios.get('http://localhost:3001');
           dispatch(getUser(response.data));

       }
        catch(err){
            console.log(err)
        }
    }
    fetchData();

},[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Users />}></Route>
      <Route path='/create' element={<CreateUser/>}></Route>

    </Routes>
    </BrowserRouter>
    
  )
}

export default App;
