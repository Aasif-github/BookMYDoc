import slots from "../models/slots.model.js";
import bookings from "../models/bookings.model.js";


const getSlots = async(req, res) => {
    try {
        const _slots = await slots.find();
        console.log('slots--->', _slots);        
        // res.status(200).send({slots});
        return res.status(200).send({
            status:"success",
            message:"All slots details",
            data: {_slots}
        });                                  
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message}); 
    }
}    

const getAvailableSlots = async(req, res) => {
    try {

        const date = req.params.date;
        
        console.log('date', date);
          const avilableSlots = await bookings
            .aggregate([
              { $match: { bookingDate: new Date(date) } },
              { $group: { _id: "$slotId", count: { $sum: 1 } } },
              { $sort: { count: -1 } }, 
          ]);
        
        // fetch booking details which match with selected date
        // match that slotId with available slots
        
        console.log('avilableSlots', avilableSlots);    
        // res.status(200).send({slots});
        return res.status(200).send({
            status:"success",
            message:"All slots details",
            data: {avilableSlots}
        });                                  
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message}); 
    }
}       

export { getSlots, getAvailableSlots } 