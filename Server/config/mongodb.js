import mongoose from 'mongoose'


const connectDB =async ()=>{
try {
  mongoose.connect(process.env.MONGODB_URI,{
    dbName: "e-learning",
    useNewUrlParser: true, // Recommended for avoiding deprecation warnings
    useUnifiedTopology: true, // Recommended for avoiding deprecation warnings
  });
  mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected Successful");
    
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  
}  catch (error) {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); 
}
}
export default  connectDB