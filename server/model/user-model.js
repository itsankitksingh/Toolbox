const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Corrected import
require('dotenv').config();

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  // console.log("actual data ", this);

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// compare the password
userSchema.methods.comparePassword = async function(password){
return bcrypt.compare(password, this.password);
};


// Instance method to generate a JWT token
userSchema.methods.generateToken = async function () {
  // console.log("I am token");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    // console.error("Token Error: ", error);
    throw error;
  }
};


// comparePassword
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


// Define the User model
const User = mongoose.model("USER", userSchema);

module.exports = User;
