//config/db.js

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to mongoDB");
  } catch (err) {
    console.error("Error connecting to mongoDB", err);
    procces.exit(1);
  }
};

module.exports = connectDB;
