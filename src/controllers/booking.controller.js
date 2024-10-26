import bookings from "../models/bookings.model.js";
import slots from "../models/slots.model.js";
import users from "../models/users.model.js";

const postBooking  = async(req, res) => {
    try {        
        const { name, phoneNo, reason, note, date, slot } = req.body;                
        // console.log(name, phoneNo, reason, note, date, slot);        
        let selectedSlot = slot.split('_');
        let startTime = new Date(selectedSlot[0]);
        let endTime = new Date(selectedSlot[1]);
                
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
        Promise.all([await _users.save(), await _bookings.save()])
            .then((response) => {             
                console.log(response);      
            }).catch((error)=>{
                console.log(`error:${error}`);
            });                                
        return res.status(201).send({
            status:"success",
            message:"Booking has made",
            data: {}
        });                                 
    } catch (error) {
        console.log(error);
    }
}

export {
    postBooking
}