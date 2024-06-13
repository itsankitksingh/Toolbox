const mongoose = require("mongoose");
require('dotenv').config()

//mongoose.connect(URI);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("mongoDB connection Successfull")
    } catch (error) {
        console.log("mongoDB connection failed!!!")
        process.exit(0);
    }
}

module.exports= connectDB;