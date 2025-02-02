import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
      type:String,
      required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    }
},
{timestamps:true}



)
export default model('User',UserSchema)