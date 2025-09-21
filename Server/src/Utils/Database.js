import mongoose from "mongoose";

const Database=async()=>{
    try {
       const a=  await mongoose.connect(`${process.env.URL}`)
       console.log("database is connected successfully")
    } catch (error) {
        console.log("mongodb connection fail",error)
    }
}

export default Database;