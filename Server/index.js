import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import userRouter from './router/userRoute.js';

dotenv.config();
const PORT = 8080;
// App config 
const app = express();

// Middleware 

app.use(cors());
app.use(express.json());
connectDB();


// api endpoint 
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send("API Working");
});
app.listen(PORT, ()=>{
  console.log("server is running on PORT", PORT);
  
})