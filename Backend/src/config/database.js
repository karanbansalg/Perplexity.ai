import mongoose from "mongoose";

export const connectDB = async (uri) => {
  
const conn =mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
  
}

// Export mongoose for use in models
export default mongoose;
