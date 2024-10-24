import mongoose from "mongoose";

const bookingSchmea = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,      
        required: true  
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,      
        required: true         
    },
    slotsId: {
        type: mongoose.Schema.Types.ObjectId,      
        required: true       
    },
    status: {
        type:String,
        required: true        
    },   
},{ timestamps:true }); 

export default mongoose.model("bookings", bookingSchmea)