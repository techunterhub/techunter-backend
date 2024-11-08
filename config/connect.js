
const mongoose = require("mongoose")

const connectDB = async () => {
  const mongoUrl = process.env.MONGODB_URI || "";

  try {
    await mongoose.connect(mongoUrl, {});
    console.log("successfully connected");
  } catch (error) {
    console.log("unable to connect with mongodb");
    process.exit(1);
  } 
};


module.exports  = connectDB