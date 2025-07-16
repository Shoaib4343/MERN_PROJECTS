import mongoose from "mongoose";

export const db = async()=>{
    console.log('MONGO_URI=', process.env.MONGO_URI);

    try {
       const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('db Connected Successfully');
        return conn;

    } catch (error) {
        console.log('db is not connected')
        console.log(error)
        process.exit(1);
    }
}