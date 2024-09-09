import mongoose from "mongoose";

const connectToMongoDb = () => {
  try {
    mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
};

export default connectToMongoDb;
