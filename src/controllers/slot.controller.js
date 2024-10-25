import slots from "../models/slots.model.js";

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

export { getSlots } 