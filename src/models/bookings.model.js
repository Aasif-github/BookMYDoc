import mongoose from "mongoose";

const bookingSchmea = new mongoose.Schema({
    //  _id: mongoose.Schema.Types.ObjectId, auto generated in mongodb
    // or
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     default: function () {
    //       return new mongoose.Types.ObjectId();
    //     },
    //     unique: true,
    //   },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',     
        required: true         
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,      
        ref: 'slots',
        required: true       
    },
    status: {
        type:String,
        required: true        
    },   
},{ timestamps:true }); 

const bookings =  mongoose.model("bookings", bookingSchmea)

export default bookings;
