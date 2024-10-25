import bookings from "../models/bookings.model.js";
import slots from "../models/slots.model.js";
import users from "../models/users.model.js";

const postBooking  = async(req, res) => {
    try {        
        const { name, phoneNo, reason, note, date, slot } = req.body;
        
        // userId:'66bbc1ff5da4cd3aa3b4750a',
        // slotId:'66bbc1ff5da4cd3aa3b4750b', 

        const userDate = { name, phoneNo, reason, note }
        const slotDetails = { startTime, endTime }    

        let _users = new users(userDate)
        let _slots = new slots(slotDetails);         

        let userId = _users._id
        let slotId = _slots._id
        
        const bookingDetails = { userId, slotId, bookingDate:date, status:"confirm" }
        
        let _bookings = new bookings(bookingDetails);
        // after saving user and slot then save booking with userId and slotId
        Promise.all([await _users.save(), await _slots.save(), await _bookings.save()])
            .then((response) => {             
                console.log(response);      
            }).catch((error)=>{
                console.log(`error:${error}`);
            });                
        
            console.log(`here`);
            
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