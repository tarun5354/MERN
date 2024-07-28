const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const EmployeeModel = require("./models/Employee");
const UserModel=require("./models/User")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ username: username });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new EmployeeModel({
      username,
      email,
      password: hashedPassword
    });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/',(req,res)=>{
  UserModel.find()
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})


app.post('/create',(req,res)=>{
  UserModel.create(req.body)
  .then(user=>res.json(user))
  .catch(err=>res.json(err))
})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
