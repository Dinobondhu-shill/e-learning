import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  image: {type:String, default:''},
  role: { type: String, enum:['instructor', 'student'], default:'student' },
  enrolledCoursed:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'course'
    }
  ]
}, {minimize:false}, {timestamps:true})


const userModel = mongoose.model("user", userSchema);

export default userModel;