import mongoose from "mongoose";

const db = async() => {
    
    try {
        const dbConnection = await mongoose.connect('mongodb://localhost:27017/BookMyDoc')   
        return dbConnection; 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }        
}

export default db;