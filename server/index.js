const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this if using JWT for authentication
const EmployeeModel = require('./models/Employee');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employee')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ username: username });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        // Generate JWT token if needed
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: "Success", token });
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

// Register endpoint
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

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
