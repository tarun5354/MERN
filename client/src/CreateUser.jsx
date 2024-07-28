import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {addUser} from "./redux/userSlice";
import { useDispatch } from 'react-redux';


function CreateUser() {
  const [name, setName] = useState()
  const [email,setEmail]=useState()
  const [mobile,setMobile]=useState()
  const [designation,setDesignation]=useState()
  const [gender,setGender]=useState()
  const [course,setCourse]=useState()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/create',{name,email,mobile,designation,gender,course})
    .then(res=>{
        console.log(res)})
    .catch(err=>console.log(err))
  }

  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            value={formData.name} 
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile No</label>
          <input 
            type="text" 
            className="form-control" 
            name="mobile" 
            value={formData.mobile} 
            onChange={(e)=>setMobile(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation</label>
          <select 
            className="form-select" 
            name="designation" 
            value={formData.designation} 
            onChange={(e)=>setDesignation(e.target.value)}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label><br/>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="gender" 
              value="M" 
              checked={formData.gender === 'M'} 
              onChange={(e)=>setGender(e.target.value)}
            />
            <label className="form-check-label">M</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="gender" 
              value="F" 
              checked={formData.gender === 'F'} 
              onChange={(e)=>setGender(e.target.value)}
            />
            <label className="form-check-label">F</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label><br/>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="MCA" 
              checked={formData.course.MCA} 
              onChange={(e)=>setCourse(e.target.value)}
            />
            <label className="form-check-label">MCA</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="BCA" 
              checked={formData.course.BCA} 
              onChange={(e)=>setCourse(e.target.value)}
            />
            <label className="form-check-label">BCA</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="BSC" 
              checked={formData.course.BSC} 
              onChange={(e)=>setCourse(e.target.value)}
            />
            <label className="form-check-label">BSC</label>
          </div>
        </div>
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateUser;
