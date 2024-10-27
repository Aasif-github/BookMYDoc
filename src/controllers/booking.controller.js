import bookings from "../models/bookings.model.js";
import slots from "../models/slots.model.js";
import users from "../models/users.model.js";

import { getIo } from "../service/socket.io.js";
const postBooking  = async(req, res) => {
    try {        
        const { name, phoneNo, reason, note, date, slot } = req.body;                
        // console.log(name, phoneNo, reason, note, date, slot);        
        let selectedSlot = slot.split('_');
        let startTime = new Date(selectedSlot[0]);
        let endTime = new Date(selectedSlot[1]);
        
        const io = getIo();

        const pipeline = [
            {
                $match: {                    
                    startTime: { $gte: startTime },
                    endTime: { $lte: endTime }
                }
            },
            {
                $project: { _id: 1 } // Only project the _id field if you only need the ID
            }
        ];

        const slotDetails = await slots.aggregate(pipeline); 
        
        console.log('slotDetails', slotDetails)
        
        if (slotDetails.length === 0) { 
            return res.send({ message: "No slot found in db" });
        }

        const userDate = { name, phoneNo, reason, note }
        // const slotDetails = { startTime, endTime }    

        let _users = new users(userDate)
        // let _slots = new slots(slotDetails);         

        let userId = _users._id
        let slotId = slotDetails[0]._id;
        
        console.log(slotId);
        
        const bookingDetails = { userId, slotId, bookingDate:date, status:"confirm" }
        
        let _bookings = new bookings(bookingDetails);
        // after saving user and slot then save booking with userId and slotId
        const createBooking = Promise.all([await _users.save(), await _bookings.save()])
            .then(async (response) => {    
                // fetch booking details of current users with time slot and send data to frontend to update view.
                await bookings.find({});
                io.emit('update', {'asd':'daskads'})  
                console.log(response);      
            }).catch((error)=>{
                console.log(`error:${error}`);
            }); 

        return res.status(201).send({
            status:"success",
            message:"Booking has made",
            data: {createBooking}
        });                                 
    } catch (error) {
        console.log(error);
    }
}

export {
    postBooking
}