const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Successfully Connect DB [${conn.connection.host}]`.bgMagenta)
        
    } catch (error) {
        console.log('Failed to connect DB'.bgRed.white)
    }
}

 module.exports = connectDB;