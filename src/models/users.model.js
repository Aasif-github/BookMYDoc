import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,      
        required: true  
    },
    name: {
        type:String,
        required: true        
    },
    phoneNo: {
        type:String,
        required: true        
    },
    reason: {
        type:String,
        required: true        
    },
    note: {
        type:String,
        required: true        
    },    
},{ timestamps:true }); 

export default mongoose.model("users", userSchema)