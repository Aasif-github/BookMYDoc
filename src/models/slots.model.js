import mongoose, { Model } from "mongoose";

const slotsSchema = new mongoose.Schema({
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    start_time:{
        type:String,
        required: true
    },
    end_time:{
        type:String,
        required: true
    }
}, {
    timestamps: true
});

// export const slots = new Model('slots', slotsSchema);
export default mongoose.model("slots", slotsSchema)