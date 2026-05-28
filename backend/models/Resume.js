import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

file:{
type:String
}

},{timestamps:true});

export default mongoose.model("Resume",resumeSchema);