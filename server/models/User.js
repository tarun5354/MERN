const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    gender: String,
    course: String,
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
